import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MyInfoStyled } from "./styled";
import { Input, Modal, Select } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { myInfo } from "@/util/myInfo";

interface Props {
  info: string;
}

// 메인 화면
const Main = ({ info }: Props) => {
  const router = useRouter();

  const {
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
    password,
    passwordCheck,
    passwordError,
    passwordCheckError,
    handlePasswordChange,
    handlePasswordCheckChange,
  } = myInfo(info);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("토큰이 없음");
      return;
    }
    if (info === "myInfo" || info === "point") {
      axios
        .get("http://localhost:5000/users/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((e) => {
          console.error("features -> myInfo(내 정보) 오류 : ", e);
        });
    } else if (info === "changePass") {
      axios
        .get("http://localhost:5000/users/passCheck", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setIsEditable(response.data.provider === ""))
        .catch((e) => console.error("정보 가져오기 오류:", e));
    }
  }, []);

  return (
    <MyInfoStyled className={clsx("main-wrap")}>
      <div className="main-container">
        {/* 내 정보 */}
        {info === "myInfo" ? (
          <>
            <h1> 내 정보 </h1>
            <div className="inputContainer">
              <div className="inputs">
                <h3>이름</h3>
                <Input
                  className="input"
                  placeholder="이름"
                  value={userInfo.name}
                  readOnly
                />
              </div>
              <div className="inputs">
                <h3>전화번호</h3>
                <Input
                  className="input"
                  placeholder="전화번호"
                  value={userInfo.phone}
                  readOnly
                />
              </div>
              <div className="inputs">
                <h3>이메일</h3>
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
                <h3>포인트</h3>
                <Input
                  className="input"
                  placeholder="포인트"
                  value={formattedPoint}
                  readOnly
                />
              </div>
              <div className="pointInfos">
                <p onClick={handleRefundClick}>반환하기</p>
                <p>내역보기</p>
              </div>
            </div>
          </>
        ) : info === "changePass" ? (
          <>
            <h1> 비밀번호 변경 </h1>
            <div className="inputContainer">
              <div className="inputs">
                <h3>비밀번호</h3>
                <div className="inputAlert">
                  <Input
                    className="input"
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <p className="alert">{passwordError}</p>
                </div>
              </div>
              <div className="inputs">
                <h3>
                  비밀번호 <br /> 확인
                </h3>
                <div className="inputAlert">
                  <Input
                    className="input"
                    placeholder="비밀번호를 다시 입력하세요"
                    type="password"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                  />
                  <p className="alert">{passwordCheckError}</p>
                </div>
              </div>
              <button className="passBtn"> 변경하기 </button>
            </div>
          </>
        ) : info === "vehicle" ? (
          <></>
        ) : (
          <></>
        )}
      </div>

      <Modal
        title="포인트 반환"
        open={refundModalOpen}
        onOk={handleRefundModalOk}
        onCancel={() => setRefundModalOpen(false)}
        okButtonProps={{
          disabled: !(
            refundDetails.account &&
            refundDetails.cardCompany &&
            refundDetails.refundPoint
          ),
        }}
      >
        <div className="refund-form">
          <div className="input-group">
            <label>계좌번호</label>
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
              value={refundDetails.cardCompany || "카드사 선택"}
              onChange={handleCardCompanyChange}
            >
              <Select.Option value="카드사 선택" disabled>
                카드사 선택
              </Select.Option>
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
