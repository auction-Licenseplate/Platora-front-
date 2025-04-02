import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import modal from "antd/es/modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { preconnect } from "react-dom";

// 유저 정보 타입 정의
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
  // 포인트
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    point: 0,
  });

  // 반환할 포인트
  const [refundDetails, setRefundDetails] = useState({
    account: "",
    cardCompany: "",
    refundPoint: 0,
  });

  // 반환할 포인트 모달창 여닫기
  const [refundModalOpen, setRefundModalOpen] = useState(false);

  // 테이블 모달창 여닫기
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  // 포인트 모달창 여닫기
  const [pointModalOpen, setPointModalOpen] = useState(false);

  // 충전할 포인트
  const [pointDetails, setPointDetails] = useState({ point: 0 });

  // 테이블 타입 받기
  const [modalType, setModalType] = useState("");

  // 테이블 데이터 받기
  const [refundTableData, setRefundTableData] = useState<object[]>([]);

  const [vehicleTableData, setVehicleTableData] = useState<object[]>([]);

  // 테이블 컬럼
  const columns = [
    { title: "항목", dataIndex: "item", key: "item" },
    { title: "상세", dataIndex: "state", key: "state" },
  ];

  // 비밀번호
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 비밀번호 input 활성화, 비활성화
  const [isEditable, setIsEditable] = useState(false);

  // 비밀번호 에러 메시지
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  // 차량 input 비어있는지 확인
  const [vehicleNumber, setVehicleNumber] = useState(""); // 차량 번호 상태
  const [file, setFile] = useState<File | null>(null); // 파일 상태

  const FileUpload = (file: any) => {
    setFile(file); // 파일 상태 업데이트
  };

  const handleVehicleNumberChange = (e: any) => {
    setVehicleNumber(e.target.value); // 차량 번호 상태 업데이트
  };

  const formattedPoint = userInfo.point
    ? userInfo.point.toLocaleString("ko-KR") + " point"
    : "0 point";

  const token = useSelector((state: RootState) => state.user.userToken);

  // 포인트 반환 요청
  const handleRefundModalOk = () => {
    if (refundDetails.refundPoint <= 0) {
      Modal.error({
        content: "반환할 포인트는 0보다 큰 값이어야 합니다.",
      });
      return;
    }
    axios
      .post("http://localhost:5000/pay/refund-point", refundDetails, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("포인트 반환 처리됨");

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          point: response.data.remainingPoint, // 남은 포인트 적용
        }));

        setRefundModalOpen(false); // 모달 닫기
        modal.success({
          title: "포인트 반환이 완료되었습니다.",
          onOk: () => window.location.reload(),
        });
      })
      .catch((error) => {
        console.error("포인트 반환 처리 오류:", error);
        modal.error({
          title: "포인트 반환에 실패했습니다.",
          content: "문제가 발생했습니다. 다시 시도해주세요.",
        });
      });
  };

  // 환불 포인트 유효성 검사
  const handleRefundPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 쉼표 제거
    let value = e.target.value.replace(/,/g, "");

    // 반환 포인트 0 이상
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 0); // 최소값 1
      if (pointValue > (userInfo.point || 0)) {
        pointValue = userInfo.point || 0;
      }
      setRefundDetails({
        ...refundDetails,
        refundPoint: pointValue,
      });
    }
  };

  // 포인트 유효성 검사
  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 쉼표 제거
    let value = e.target.value.replace(/,/g, "");

    // 0으로 시작하지 않게
    if (/^0/.test(value) && value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    // 반환 포인트 0 이상
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 1); // 최소값 1

      setPointDetails({
        point: pointValue,
      });
    }
  };

  // 모달 안 현재 포인트 관리
  const setMaxRefundPoint = () => {
    setRefundDetails({
      ...refundDetails,
      refundPoint: userInfo.point || 0,
    });
  };

  // 충전할 포인트
  const handleTossPayment = async (userInfo: any) => {
    try {
      const amount = pointDetails.point;
      const orderId = `order-${Date.now()}`;
      const orderName = "포인트 충전";

      // 클라이언트 키 넘겨주기
      const response = await axios.get(
        "http://localhost:5000/pay/toss-client-key"
      );

      const tossClientKey = response.data.tossClientKey;

      const toss = await loadTossPayments(tossClientKey);

      // 결제 요청
      toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        successUrl: `http://localhost:3000/payment/success?&amount=${amount}`,
        failUrl: `http://localhost:3000/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
      alert("결제를 시작할 수 없습니다.");
    }
  };

  // 계좌번호 유효성 검사
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자 - 만 가능
    let value = e.target.value.replace(/[^0-9-]/g, "");

    // 20자 이하
    if (value.length <= 20) {
      setRefundDetails((prev) => ({
        ...prev,
        account: value,
      }));
    }
  };

  // 카드사 유효성 검사
  const handleCardCompanyChange = (value: string) => {
    // select에서 선택
    setRefundDetails({
      ...refundDetails,
      cardCompany: value,
    });
  };

  // 비밀번호 유효성 조건
  const validatePassword = (password: string) => {
    const isLengthValid = password.length >= 10;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password); // 특수문자 확인
    return isLengthValid && hasLowerCase && hasNumber && hasSpecialChar;
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    setPasswordError(
      isValid
        ? ""
        : "비밀번호는 최소한 10자 이상, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  // 비밀번호 재확인
  const handlePasswordCheckChange = (e: any) => {
    const value = e.target.value;
    setPasswordCheck(value);
    const isValid = value === password;
    setPasswordCheckError(isValid ? "" : "비밀번호가 일치하지 않습니다.");
  };

  // 반환 데이터 요청 -> 해당 유저의 refund_amount 랑 환불 성공 여부! < 이것도 추가해야 할 것 같아!!
  // const fetchRefundData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/pay/refundData", {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Util -> myInfo(fetchRefundData) 오류:", error);
  //   }
  // };

  // payments 에서 amount, refund_amount, status, refund_status 가져오기
  const payTableInfo = async () => {
    const response = await axios.get("http://localhost:5000/pay/payInfo", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.payPoint.length === 0) {
      return;
    } else {
      const payData = response.data.payPoint.map(
        (item: any, index: number) => ({
          item: item.refund_amount
            ? `- ${(item.refund_amount ?? 0).toLocaleString()} 포인트`
            : `+ ${(item.amount ?? 0).toLocaleString()} 포인트`,
          state: item.refund_status || item.status || "처리 중",
          key: index,
        })
      );

      setRefundTableData(payData);
    }
  };

  // vehicle 데이터 요청 -> plate_num, ownership_statu 두 개 보내줘!
  const fetchVehicleData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/vehicles/vehicleData",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const vehicleData = response.data.map((item: any) => ({
        item: item.plate_num,
        state: item.ownership_status,
      }));

      setVehicleTableData(vehicleData);

      setVehicleTableData(response.data);
    } catch (error) {
      console.error("Util -> myInfo(fetchVehicleData) 오류:", error);
    }
  };

  // 테이블 타입에 따라 데이터 받기
  const handleTableModalOpen = (type: string) => {
    setModalType(type);
    if (type === "refund") {
      payTableInfo();
    } else if (type === "vehicle") {
      fetchVehicleData();
    }
    setTableModalOpen(true);
  };

  // 파일 저장 -> users 테이블에 certificate 부분 파일 저장! multer 로 저장한다고 해놨어!
  const handleFileUpload = (file: File, onSuccess: any) => {
    setFile(file); // 파일을 상태로만 저장
    onSuccess("파일이 선택되었습니다."); // 즉시 성공 콜백 실행
  };

  // 공인 인증서 보내기
  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("vehicleNumber", vehicleNumber);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Modal.success({
        title: "🚗 차량 등록 완료",
        content: "차량 정보가 성공적으로 등록되었습니다!",
      });
    } catch (error) {
      console.log("util -> myInfo :", error);
    }
  };

  return {
    userInfo,
    setUserInfo,
    isEditable,
    setIsEditable,
    cardCompanies,
    formattedPoint,
    handleRefundModalOk,
    handleRefundPointChange,
    setMaxRefundPoint,
    handleAccountChange,
    handleCardCompanyChange,
    refundModalOpen,
    refundDetails,
    setRefundModalOpen,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    passwordError,
    passwordCheckError,
    handlePasswordChange,
    handlePasswordCheckChange,
    handleFileUpload,
    tableModalOpen,
    setTableModalOpen,
    tableData,
    setTableData,
    columns,
    handleTableModalOpen,
    modalType,
    setModalType,
    refundTableData,
    vehicleTableData,

    vehicleNumber,
    setVehicleNumber,
    file,
    setFile,
    FileUpload,
    handleVehicleNumberChange,

    pointModalOpen,
    setPointModalOpen,
    pointDetails,
    setPointDetails,
    handlePointChange,
    handleRegister,

    handleTossPayment,

    setRefundTableData,
    payTableInfo,
  };
};
