import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import modal from "antd/es/modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadTossPayments } from "@tosspayments/payment-sdk";

// ✅ 타입 정의
export interface UserInfo {
  name?: string;
  phone?: string;
  email?: string;
  point?: number;
}

interface RefundData {
  item: string;
  state: any;
}

interface ScoreType {
  grade: string;
  score: number;
  price: number;
}
export const cardCompanies = [
  "삼성카드",
  "신한카드",
  "롯데카드",
  "현대카드",
  "우리카드",
  "KB국민카드",
  "하나카드",
  "농협카드",
  "BC카드",
  "카카오뱅크",
  "이마트카드",
  "삼천리카드",
  "서울카드",
  "씨티카드",
  "외환카드",
  "하이카드",
];

export const myInfo = (info: string) => {
  const token = useSelector((state: RootState) => state.user.userToken);

  // ✅ 상태 관리

  // ⑴ 유저 정보, 정보 업데이트
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    point: 0,
  });

  // ⑵ 충전할 포인트 저장
  // - 환불 포인트 저장
  const [refundDetails, setRefundDetails] = useState({
    account: "",
    cardCompany: "",
    refundPoint: 0,
  });

  // - 충전 포인트 저장
  const [pointDetails, setPointDetails] = useState({ point: 0 });

  // ⑵ 모달 상태
  // - 순서대로 환불 모달, 테이블(차량, 결제 내역), 충전 모달
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [pointModalOpen, setPointModalOpen] = useState(false);

  // ⑶ 테이블 상태
  // - 테이블 종류 설정 (차량, 결제 내역에 따라 데이터 담기)
  const [modalType, setModalType] = useState("");

  // - 각 타입에 따른 테이블 정보
  const [refundTableData, setRefundTableData] = useState<object[]>([]);
  const [vehicleTableData, setVehicleTableData] = useState<object[]>([]);
  const [payTableData, setPayTableData] = useState<object[]>([]);

  const columns = [
    { title: "날짜", dataIndex: "date", key: "date" },
    { title: "항목", dataIndex: "item", key: "item" },
    { title: "상세", dataIndex: "state", key: "state" },
  ];

  // ⑷ 비밀번호 상태
  // - 비밀번호, 비밀번호 확인
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // - 비밀번호 입력 필드 편집 가능 여부 -> 로컬 로그인 외 input 비활성화를 위함
  const [isEditable, setIsEditable] = useState(false);

  // - 비밀번호 에러 메시지 출력 & 버튼 활성화 여부 체크
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  // ⑸ 차량 등록 상태
  // - 차량 번호, 파일
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);

  //차량 번호판 점수
  const [score, setScore] = useState<ScoreType | null>(null);

  useEffect(() => {}, [score]);

  // ✅ 포인트 관련 함수

  // ⑴ 포인트 로컬스트링으로
  const formattedPoint = userInfo.point
    ? userInfo.point.toLocaleString("ko-KR") + " point"
    : "0 point";

  // ⑵ 환불 포인트
  // - 환불할 포인트 요청 ( 요청 후 reload )
  const handleRefundModalOk = () => {
    if (refundDetails.refundPoint <= 0) {
      Modal.error({ content: "반환할 포인트는 0보다 큰 값이어야 합니다." });
      return;
    }
    axios
      .post("http://localhost:5000/pay/refund-point", refundDetails, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserInfo((prev) => ({
          ...prev,
          point: response.data.remainingPoint,
        }));
        setRefundModalOpen(false);
        modal.success({
          title: "포인트 반환이 완료되었습니다.",
          onOk: () => window.location.reload(),
        });
      })
      .catch(() => {
        modal.error({
          title: "포인트 반환에 실패했습니다.",
          content: "문제가 발생했습니다. 다시 시도해주세요.",
        });
      });
  };

  // - 환불할 포인트 입력 핸들러 ( 0 이상, 환불 포인트에 저장 useState )
  const handleRefundPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, "");
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 0);
      if (pointValue > (userInfo.point || 0)) {
        pointValue = userInfo.point || 0;
      }
      setRefundDetails({ ...refundDetails, refundPoint: pointValue });
    }
  };

  // - 환불 최대 포인트 설정 -> 본인 포인트보다 적게
  const setMaxRefundPoint = () => {
    setRefundDetails({ ...refundDetails, refundPoint: userInfo.point || 0 });
  };

  // ⑶ 충전 포인트
  // - 충전할 포인트 입력 핸들러 ( 0 이상, 충전 포인트에 저장 useState )
  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, "");
    if (/^0/.test(value) && value.length > 0) {
      value = value.replace(/^0+/, "");
    }
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 0);
      setPointDetails({ point: pointValue });
    }
  };

  // - 충전 시 토스 api 호출
  const handleTossPayment = async () => {
    try {
      const amount = pointDetails.point;
      const orderId = `order-${Date.now()}`;
      const orderName = "포인트 충전";

      const res = await axios.get("http://localhost:5000/pay/toss-client-key");
      const tossClientKey = res.data.tossClientKey;
      const toss = await loadTossPayments(tossClientKey); // 토스 sdk

      toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        successUrl: `http://localhost:3000/payment/success?&amount=${amount}`,
        failUrl: `http://localhost:3000/payment/fail`,
      });
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      alert("결제를 시작할 수 없습니다.");
    }
  };

  // ✅ 계좌 및 카드사 입력

  // ⑴ 계좌번호 입력 핸들러
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9-]/g, "");
    if (value.length <= 20) {
      setRefundDetails((prev) => ({ ...prev, account: value }));
    }
  };

  // ⑵ 카드사 선택 핸들러
  const handleCardCompanyChange = (value: string) => {
    setRefundDetails({ ...refundDetails, cardCompany: value });
  };

  // ✅ 비밀번호 변경

  // ⑴ 비밀번호, 비밀번호 확인 유효성 검사
  const validatePassword = (pw: string) =>
    pw.length >= 10 &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^a-zA-Z0-9]/.test(pw);

  const handlePasswordChange = (e: any) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordError(
      validatePassword(val)
        ? ""
        : "비밀번호는 최소한 10자 이상, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  const handlePasswordCheckChange = (e: any) => {
    const val = e.target.value;
    setPasswordCheck(val);
    setPasswordCheckError(
      val === password ? "" : "비밀번호가 일치하지 않습니다."
    );
  };

  // ⑵ 비밀번호 변경 요청 ( 성공 시 reload )
  const pwvalue = () => {
    axios
      .post(
        "http://localhost:5000/auth/pwfind/updatepw",
        { password },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        Modal.success({
          content: "비밀번호 변경이 성공하였습니다!",
          onOk: () => window.location.reload(),
        });
      })
      .catch(() => {
        Modal.error({
          content: "비밀번호 변경에 실패하였습니다. 다시 시도해주세요.",
        });
      });
  };

  // ✅ 테이블 모달 관리

  // ⑴ 내역 모달창

  // - 포인트 내역 요청 후 useState에 저장 (테이블 내역 출력을 위해)
  const payTableInfo = async () => {
    const res = await axios.get("http://localhost:5000/pay/payInfo", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.payPoint.length > 0) {
      const payData = res.data.payPoint.map((item: any, index: number) => {
        const isRefund =
          item.refund_amount !== null && item.refund_amount !== undefined;
        const isPointMinus =
          item.point_minus !== null && item.point_minus !== undefined;

        const date = new Date(item.create_at).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        // 각 항목 구분
        if (isRefund) {
          return {
            item: "포인트 환불",
            state: `- ${(item.refund_amount ?? 0).toLocaleString()} 포인트`,
            date,
            key: Date.now() + index,
          };
        } else if (isPointMinus) {
          return {
            item: "차량 점수 확인",
            state: `- ${(item.point_minus ?? 0).toLocaleString()} 포인트`,
            date,
            key: Date.now() + index,
          };
        } else {
          return {
            item: "포인트 충전",
            state: `+ ${(item.amount ?? 0).toLocaleString()} 포인트`,
            date,
            key: Date.now() + index,
          };
        }
      });

      setRefundTableData(payData);
    }
  };

  // - 차량 등록 정보 요청 후 useState에 저장 (테이블 내역 출력을 위해)
  const fetchVehicleData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/vehicles/vehicleData",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const vehicleData = res.data.map((item: any, index: number) => {
        const date = new Date(item.create_at).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          date,
          item: item.plate_num,
          state: item.ownership_status,
          key: index,
        };
      });

      setVehicleTableData(vehicleData);
    } catch (error) {
      console.error("Util -> myInfo(fetchVehicleData) 오류:", error);
    }
  };

  // - 내역 타입에 따른 모달창 관리 ( useState : 타입 업데이트 및 모달 열림 업데이트 )
  const handleTableModalOpen = (type: string) => {
    setModalType(type);
    if (type === "refund") payTableInfo();
    else if (type === "vehicle") fetchVehicleData();
    setTableModalOpen(true);
  };

  // ✅ 차량 등록

  // ⑴ 차 번호, 파일 업로드 (useState)
  const handleVehicleNumberChange = (e: any) =>
    setVehicleNumber(e.target.value);

  const handleFileUpload = (file: File, onSuccess: any) => {
    setFile(file);
    onSuccess("파일이 선택되었습니다.");
  };

  // ⑵ 차량 등록 요청
  const handleRegister = async (score) => {
    const formData = new FormData();
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("grade", String(score?.grade));
    formData.append("score", String(score?.score));
    formData.append("price", String(score?.price));

    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/users/certificate", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Modal.success({
        title: "🚗 차량 등록 완료",
        content: "차량 정보가 성공적으로 등록되었습니다!",
        onOk: () => window.location.reload(),
      });
    } catch (error) {
      console.log("util -> myInfo :", error);
    }
  };

  return {
    // ✅ 유저 정보 및 편집 상태
    userInfo,
    setUserInfo,
    isEditable,
    setIsEditable,

    // ✅ 포인트 충전 관련
    cardCompanies,
    formattedPoint,
    pointDetails,
    setPointDetails,
    handlePointChange,
    handleTossPayment,

    // ✅ 포인트 환불 관련
    refundDetails,
    setRefundDetails,
    refundModalOpen,
    setRefundModalOpen,
    handleRefundModalOk,
    handleRefundPointChange,
    setMaxRefundPoint,
    handleAccountChange,
    handleCardCompanyChange,
    payTableData,
    setPayTableData,

    // ✅ 비밀번호 변경 관련
    password,
    passwordCheck,
    setPassword,
    setPasswordCheck,
    passwordError,
    passwordCheckError,
    handlePasswordChange,
    handlePasswordCheckChange,
    pwvalue,

    // ✅ 테이블 (포인트 내역, 차량 등록 내역) 관련
    tableModalOpen,
    setTableModalOpen,
    columns,
    modalType,
    setModalType,
    handleTableModalOpen,
    refundTableData,
    setRefundTableData,
    vehicleTableData,
    payTableInfo,
    setVehicleTableData,

    // ✅ 차량 등록 관련
    vehicleNumber,
    setVehicleNumber,
    file,
    setFile,
    handleVehicleNumberChange,
    handleFileUpload,
    handleRegister,
    score,
    setScore,

    // ✅ 포인트 충전 모달
    pointModalOpen,
    setPointModalOpen,
  };
};
