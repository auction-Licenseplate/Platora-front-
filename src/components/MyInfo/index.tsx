import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MyInfoStyled } from "./styled";
import { Button, Input, Modal, Select, Table, Upload } from "antd";
import axios from "axios";
import { myInfo } from "@/util/useMyInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MyInfor from "./MyInfor/index";

// 컴포넌트
import MyPoint from "./MyPoint";
import ChangePass from "./ChangePass";
import Vehicle from "./Vehicle";

interface Props {
  info: string;
}

// 메인 화면
const MyInfo = ({ info }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 다크, 라이트 모드 -> 이미지 바뀌어야 함
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // 비밀번화 활성화, 비활성화
  const [provider, setProvider] = useState<"naver" | "google" | "kakao" | null>(
    null
  );

  const {
    userInfo,
    setUserInfo,
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
    handleTableModalOpen,
    modalType,
    columns,
    vehicleTableData,
    vehicleNumber,
    file,
    handleVehicleNumberChange,
    pointModalOpen,
    setPointModalOpen,
    pointDetails,
    handlePointChange,
    handleRegister,
    handleTossPayment,
    pwvalue,
    refundTableData,
    payTableData,
    setPayTableData,
  } = myInfo(info);

  // 랜더링 시 사용자 정보 가져오기 & 비밀번호 활성화, 비활성화
  useEffect(() => {
    if (token === "" || !token) return;

    if (info === "myInfo" || info === "point") {
      axios
        .get("http://localhost:5000/users/user-info", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setProvider(response.data.provider);
        })
        .catch((e) => {
          console.error("features -> myInfo(내 정보) 오류 : ", e);
        });
    } else if (info === "changePass") {
      axios
        .get("http://localhost:5000/users/passCheck", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsEditable(response.data.provider === "");
          setProvider(response.data.provider);
        })
        .catch((e) => console.error("정보 가져오기 오류:", e));
    }
  }, []);

  // 모드에 따라 이미지 변경 시 필요
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <MyInfoStyled className={clsx("main-wrap-info")}>
      <div className="main-container">
        {/* 내 정보 */}
        {info === "myInfo" ? (
          <>
            <MyInfor isDarkMode={isDarkMode} userInfo={userInfo} />
          </>
        ) : info === "point" ? (
          <>
            <MyPoint
              isDarkMode={isDarkMode}
              formattedPoint={formattedPoint}
              handleTableModalOpen={handleTableModalOpen}
              setRefundModalOpen={setRefundModalOpen}
              setPointModalOpen={setPointModalOpen}
            />
          </>
        ) : info === "changePass" ? (
          <>
            <ChangePass
              isDarkMode={isDarkMode}
              password={password}
              handlePasswordChange={handlePasswordChange}
              provider={provider}
              passwordError={passwordError}
              passwordCheck={passwordCheck}
              handlePasswordCheckChange={handlePasswordCheckChange}
              passwordCheckError={passwordCheckError}
              pwvalue={pwvalue}
            />
          </>
        ) : info === "vehicle" ? (
          <>
            <Vehicle
              isDarkMode={isDarkMode}
              handleTableModalOpen={handleTableModalOpen}
              vehicleNumber={vehicleNumber}
              handleVehicleNumberChange={handleVehicleNumberChange}
              handleFileUpload={handleFileUpload}
              file={file}
              handleRegister={handleRegister}
              payTableData={payTableData}
              setPayTableData={setPayTableData}
            />
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
        title={modalType === "refund" ? "결제 내역 보기" : "차량 내역 보기"}
        open={tableModalOpen}
        onCancel={() => setTableModalOpen(false)}
        footer={null}
      >
        <Table
          dataSource={
            modalType === "refund" ? refundTableData : vehicleTableData
          }
          columns={columns}
          rowKey="key"
        />
      </Modal>

      {/* 포인트 충전 모달 */}

      <Modal
        title="포인트 충전"
        open={pointModalOpen}
        onCancel={() => setPointModalOpen(false)}
        okButtonProps={{
          disabled: !pointDetails.point,
        }}
        onOk={() => handleTossPayment()}
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
      </Modal>
    </MyInfoStyled>
  );
};

export default MyInfo;
