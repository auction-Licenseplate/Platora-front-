import { useState } from "react";
import { Modal } from "antd";

// 유저 정보 타입 정의
export interface UserInfo {
  name?: string;
  phone?: string;
  email?: string;
  point?: number;
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

  // 비밀번호 input 활성화, 비활성화
  const [isEditable, setIsEditable] = useState(false);

  const formattedPoint = userInfo.point
    ? userInfo.point.toLocaleString("ko-KR") + " point"
    : "0 point";

  // 반환하기 클릭
  const handleRefundClick = () => {
    setRefundModalOpen(true);
  };

  // 포인트 반환 요청
  const handleRefundModalOk = () => {
    if (refundDetails.refundPoint <= 0) {
      Modal.error({
        content: "반환할 포인트는 0보다 큰 값이어야 합니다.",
      });
      return;
    }

    setRefundModalOpen(false);
    // axios
    //   .post("http://localhost:5000/auth/refund-point", refundDetails)
    //   .then((response) => {
    //     console.log("포인트 반환 처리됨", response.data);
    //     setrefundModalOpen(false); // 모달 닫기
    //     modal.success({
    //       title: "포인트 반환이 완료되었습니다.",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("포인트 반환 처리 오류:", error);
    //     modal.error({
    //       title: "포인트 반환에 실패했습니다.",
    //       content: "문제가 발생했습니다. 다시 시도해주세요.",
    //     });
    //   });
  };

  // 포인트 유효성 검사
  const handleRefundPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 쉼표 제거
    let value = e.target.value.replace(/,/g, "");

    // 0으로 시작하지 않게
    if (/^0/.test(value) && value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    // 반환 포인트 0 이상
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 1); // 최소값 1
      if (pointValue > (userInfo.point || 0)) {
        pointValue = userInfo.point || 0;
      }
      setRefundDetails({
        ...refundDetails,
        refundPoint: pointValue,
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

  return {
    userInfo,
    setUserInfo,
    isEditable,
    setIsEditable,
    cardCompanies,
    formattedPoint,
    handleRefundClick,
    handleRefundModalOk,
    handleRefundPointChange,
    setMaxRefundPoint,
    handleAccountChange,
    handleCardCompanyChange,
    refundModalOpen,
    refundDetails,
    setRefundModalOpen,
  };
};
