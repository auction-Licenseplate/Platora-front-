import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { MyInfoStyled } from "./styled";
import { Input, Modal, Select } from "antd";
import Cookies from "js-cookie";

interface Props {
  info: string;
}

// 유저 정보 타입 정의
interface UserInfo {
  name?: string;
  phone?: string;
  email?: string;
  point?: number;
}

const cardCompanies = [
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

// 메인 화면
const Main = ({ info }: Props) => {
  const router = useRouter();

  const [modal, contextHolder] = Modal.useModal();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    point: 300,
  });

  // 포인트 반환
  const [refundDetails, setRefundDetails] = useState({
    account: "",
    cardCompany: "",
    refundPoint: 0,
  });

  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    // const token = Cookies.get("token");
    // if (!token) {
    //   console.error("토큰이 없음");
    //   return;
    // }
    // if (info === "myInfo") {
    //   axios
    //     .get("http://localhost:5000/auth/user-info", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       setUserInfo(response.data);
    //     })
    //     .catch((e) => {
    //       console.error("features -> myInfo(내 정보) 오류 : ", e);
    //     });
    // } else if (info === "point") {
    //   axios
    //     .get("http://localhost:5000/auth/user-point", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       setUserInfo(response.data);
    //     })
    //     .catch((e) => {
    //       console.error("features -> myInfo(포인트) 오류 : ", e);
    //     });
    // }
  }, []);

  // 포인트 포맷팅
  const formattedPoint = userInfo.point
    ? userInfo.point.toLocaleString("ko-KR") + " point"
    : "0 point";

  // 첫 번째 모달 (반환하기 확인)
  const handleRefundClick = () => {
    // 첫 번째 모달을 띄우는 방식
    setIsRefundModalOpen(true);
  };

  const handleRefundModalCancel = () => {
    setIsRefundModalOpen(false); // 두 번째 모달 닫기
  };

  const handleRefundModalOk = () => {
    if (refundDetails.refundPoint <= 0) {
      modal.error({
        title: "포인트 반환 오류",
        content: "반환할 포인트는 0보다 큰 값이어야 합니다.",
      });
      return;
    }
    axios
      .post("http://localhost:5000/auth/refund-point", refundDetails)
      .then((response) => {
        console.log("포인트 반환 처리됨", response.data);
        setIsRefundModalOpen(false); // 모달 닫기
        modal.success({
          title: "포인트 반환이 완료되었습니다.",
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

  // 반환할 포인트가 바뀔 때마다 처리
  const handleRefundPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, ""); // 쉼표 제거

    // 0으로 시작하는 값은 입력되지 않도록 처리
    if (/^0/.test(value) && value.length > 1) {
      value = value.replace(/^0+/, ""); // 앞의 0을 제거
    }

    // 숫자만 입력받도록 처리하고, 0보다 작으면 0으로 설정
    if (/^\d+$/.test(value) || value === "") {
      let pointValue = Math.max(Number(value), 1); // 최소값 1로 설정
      if (pointValue > (userInfo.point || 0)) {
        pointValue = userInfo.point || 0; // 현재 포인트를 초과하면 그만큼만 설정
      }
      setRefundDetails({
        ...refundDetails,
        refundPoint: pointValue,
      });
    }
  };

  // 반환할 포인트 입력란에 현재 포인트 넣기
  const setMaxRefundPoint = () => {
    setRefundDetails({
      ...refundDetails,
      refundPoint: userInfo.point || 0,
    });
  };

  // 계좌번호 유효성 체크
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9-]/g, ""); // 숫자와 '-'만 허용

    // 계좌번호는 20자 이하로 제한
    if (value.length <= 20) {
      setRefundDetails((prev) => ({
        ...prev,
        account: value, // 수정된 값을 account 상태에 반영
      }));
    }
  };

  // 카드사 유효성 체크
  const handleCardCompanyChange = (value: string) => {
    setRefundDetails({
      ...refundDetails,
      cardCompany: value, // 카드사 선택 값
    });
  };

  return (
    <MyInfoStyled className={clsx("main-wrap")}>
      <div className="main-container">
        {/* 내 정보 */}
        {info === "myInfo" ? (
          <>
            <h1> 내 정보 </h1>
            <div className="inputContainer">
              <div className="inputs">
                <h2>이름</h2>
                <Input
                  className="input"
                  placeholder="이름"
                  value={userInfo.name}
                  readOnly
                />
              </div>
              <div className="inputs">
                <h2>전화번호</h2>
                <Input
                  className="input"
                  placeholder="전화번호"
                  value={userInfo.phone}
                  readOnly
                />
              </div>
              <div className="inputs">
                <h2>이메일</h2>
                <Input
                  className="input"
                  placeholder="이메일"
                  value={userInfo.email}
                  readOnly
                />
              </div>
            </div>
          </>
        ) : info === "point" ? (
          <>
            {/* 포인트 */}
            <h1> 포인트 충전 </h1>
            <div className="inputContainer">
              <div className="inputs">
                <h2>포인트</h2>
                <Input
                  className="input"
                  placeholder="포인트"
                  value={formattedPoint}
                  readOnly
                />
              </div>
              <p className="returnPoint" onClick={handleRefundClick}>
                반환하기
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <Modal
        title="포인트 반환"
        open={isRefundModalOpen}
        onOk={handleRefundModalOk}
        onCancel={() => setIsRefundModalOpen(false)}
      >
        <div className="refund-form">
          <div className="inputs">
            <h2>계좌번호</h2>
            <Input
              className="input"
              placeholder="계좌번호 (숫자, -만 허용)"
              value={refundDetails.account}
              onChange={handleAccountChange}
            />
          </div>
          <div className="input-group">
            <label>카드사</label>
            <Select
              value={refundDetails.cardCompany}
              onChange={handleCardCompanyChange}
              placeholder="카드사를 선택하세요"
            >
              {cardCompanies.map((company) => (
                <Select.Option key={company} value={company}>
                  {company}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="input-group">
            <label>반환할 포인트</label>
            <Input
              value={refundDetails.refundPoint.toLocaleString()}
              onChange={handleRefundPointChange}
              type="text"
              placeholder="반환할 포인트를 입력하세요"
            />
            <div
              className="currentPoint"
              onClick={setMaxRefundPoint}
              style={{ cursor: "pointer", marginTop: "10px", color: "#1890ff" }}
            >
              현재 포인트: {userInfo.point?.toLocaleString() || "0"} 포인트
            </div>
          </div>
        </div>
      </Modal>
    </MyInfoStyled>
  );
};

export default Main;
