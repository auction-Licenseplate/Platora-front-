import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MyInfoStyled } from "./styled";
import { Button, Input, Modal, Select, Table, Upload } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { myInfo } from "@/util/myInfo";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { loadTossPayments } from "@tosspayments/payment-sdk";

// 이미지
import accountLogo from "@/assets/images/accountLogo.png";
import pointLogo from "@/assets/images/pointLogo.png";
import passwordLogo from "@/assets/images/passwordLogo.png";
import vehicleLogo from "@/assets/images/vehicleLogo.png";

import accountBlack from "@/assets/images/myAccountLogo(black).png";
import pointBlack from "@/assets/images/pointLogo(black).png";
import passwordBlack from "@/assets/images/passwordLogo(black).png";
import vehicleBlack from "@/assets/images/vehicleLogo(black).png";

interface Props {
  info: string;
}

// 메인 화면
const MyInfo = ({ info }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const theme = useSelector((state: RootState) => state.theme.mode);

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

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

  const {
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
    passwordCheck,
    passwordError,
    passwordCheckError,
    handlePasswordChange,
    handlePasswordCheckChange,
    handleFileUpload,
    tableModalOpen,
    setTableModalOpen,
    tableData,
    setTableData,
    handleTableModalOpen,
    modalType,
    setModalType,
    columns,
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
  } = myInfo(info);

  useEffect(() => {
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

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <MyInfoStyled className={clsx("main-wrap-info")}>
      <div className="main-container">
        {/* 내 정보 */}
        {info === "myInfo" ? (
          <>
            <Image
              key={isDarkMode ? "dark" : "light"}
              src={isDarkMode ? accountLogo : accountBlack}
              alt="account logo"
              width={350}
            />
            <div className="inputContainer">
              <div className="inputs readOnly">
                <h3>이름</h3>
                <Input
                  className="input"
                  placeholder="이름"
                  value={userInfo.name}
                  readOnly
                />
              </div>
              <div className="inputs readOnly">
                <h3>전화번호</h3>
                <Input
                  className="input"
                  placeholder="전화번호"
                  value={userInfo.phone}
                  readOnly
                />
              </div>
              <div className="inputs readOnly">
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
            <Image
              key={isDarkMode ? "dark" : "light"}
              src={isDarkMode ? pointLogo : pointBlack}
              alt="point logo"
              width={200}
            />
            <div className="inputContainer">
              <div className="inputs readOnly">
                <h3>포인트</h3>
                <Input
                  className="input"
                  placeholder="포인트"
                  value={formattedPoint}
                  readOnly
                />
              </div>
              <div className="pointInfos">
                <p
                  onClick={() => {
                    setRefundModalOpen(true);
                  }}
                >
                  반환하기
                </p>
                <p
                  onClick={() => {
                    handleTableModalOpen("refund");
                  }}
                >
                  내역보기
                </p>
              </div>
              <button
                className="passBtn"
                onClick={() => {
                  setPointModalOpen(true);
                }}
              >
                충전하기
              </button>
            </div>
          </>
        ) : info === "changePass" ? (
          <>
            <Image
              key={isDarkMode ? "dark" : "light"}
              src={isDarkMode ? passwordLogo : passwordBlack}
              alt="password logo"
              width={300}
            />
            <div className="inputContainer">
              <div className="inputs">
                <h3>비밀번호</h3>
                <Input
                  className="input"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {password && <p className="alert">{passwordError}</p>}
              </div>
              <div className="inputs">
                <h3>비밀번호 확인</h3>
                <Input
                  className="input"
                  placeholder="비밀번호를 다시 입력하세요"
                  type="password"
                  value={passwordCheck}
                  onChange={handlePasswordCheckChange}
                />
                {passwordCheck && (
                  <p className="alertCheck">{passwordCheckError}</p>
                )}
              </div>
              <button
                className="passBtn"
                disabled={
                  !password ||
                  !passwordCheck ||
                  !!passwordError ||
                  !!passwordCheckError
                }
              >
                변경하기
              </button>
            </div>
          </>
        ) : info === "vehicle" ? (
          <>
            <Image
              key={isDarkMode ? "dark" : "light"}
              src={isDarkMode ? vehicleLogo : vehicleBlack}
              alt="vehicle logo"
              width={250}
            />
            <div className="inputContainer">
              <div className="inputs">
                <h3>차량 번호</h3>
                <Input
                  className="input"
                  value={vehicleNumber}
                  onChange={handleVehicleNumberChange}
                  placeholder="차량 번호를 입력하세요"
                />
              </div>
              <div className="inputs">
                <h3>공인 인증서</h3>
                <div className="input">
                  <Upload
                    className="upLoad"
                    customRequest={({ file }) => handleFileUpload(file)}
                  >
                    <Button icon={<UploadOutlined />}>파일 선택</Button>
                  </Upload>
                </div>
              </div>
              <div className="pointInfos">
                <p
                  onClick={() => {
                    handleTableModalOpen("vehicle");
                  }}
                >
                  내역보기
                </p>
              </div>
              <button className="passBtn" disabled={!vehicleNumber || !file}>
                등록하기
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* 포인트 모달 */}
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

      {/* table 모달창 */}
      <Modal
        title={modalType === "refund" ? "환불 내역 보기" : "차량 내역 보기"}
        open={tableModalOpen}
        onCancel={() => setTableModalOpen(false)}
        footer={null}
      >
        <Table
          dataSource={
            modalType === "refund" ? refundTableData : vehicleTableData
          }
          columns={columns}
        />
      </Modal>

      {/* 포인트 충전 모달 */}
      <Modal
        title="포인트 충전"
        open={pointModalOpen}
        onCancel={() => setPointModalOpen(false)}
        footer={null}
      >
        <div className="input-group">
          <label>충전할 포인트</label>
          <Input
            value={pointDetails.point.toLocaleString()}
            onChange={handlePointChange}
            type="text"
            placeholder="충전할 포인트를 입력하여 주세요"
          />
        </div>

        <Button onClick={handleTossPayment}> 충전하기 </Button>
      </Modal>
    </MyInfoStyled>
  );
};

export default MyInfo;
