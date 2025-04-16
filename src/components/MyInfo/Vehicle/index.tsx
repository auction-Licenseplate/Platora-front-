import Image from "next/image";
import { Button, Input, Tooltip, Upload } from "antd";
import AiPoint from "@/features/MyPageManeger/AiPoint";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { myInfo } from "@/util/useMyInfo";

// 이미지
import userPlateIcon from "@/assets/images/userPlateIcon.png";
import userCertifiIcon from "@/assets/images/userCertificateIcon.png";
import infoIcon from "@/assets/images/infoIcon.png";

const Vehicle = ({
  isDarkMode,
  handleTableModalOpen,
  vehicleNumber,
  handleVehicleNumberChange,
  handleFileUpload,
  file,
  handleRegister,
  payTableData,
  setPayTableData,
}) => {
  const { score, setScore } = myInfo("");
  const [point, setPoint] = useState("");

  return (
    <>
      <div className="inputContainer">
        <div className="infoText">
          <p>차량 정보</p>

          <Tooltip
            title={
              <div>
                <p>
                  <strong>등급 확인</strong>
                </p>
                <p className="pTag">등급 확인 시 100포인트가 차감됩니다.</p>
                <p className="pTag">
                  등급을 확인한 번호판은 등록이 가능합니다.
                </p>

                <br />

                <p>
                  <strong>차량 등록</strong>
                </p>
                <p className="pTag">
                  본인의 공인인증서와 번호판을 등록해 주세요.
                </p>
                <p className="pTag">
                  경매에서 구매한 번호판은 다시 판매할 수 없으니 유의해 주세요.
                </p>
                <p className="pTag">
                  내역 보기를 통해 승인 여부를 확인해 주세요.
                </p>
              </div>
            }
            placement="bottom"
            overlayClassName="custom-tooltip"
          >
            <Image className="infoIcon" src={infoIcon} alt="info icon" />
          </Tooltip>
        </div>

        <div className="inputs">
          <Image
            className="inputTextIcon"
            src={userCertifiIcon}
            alt="userCertificate icon"
          />
          <p>공인 인증서</p>
          <div className="input fileInput">
            <Upload
              className="upLoad"
              customRequest={({ file, onSuccess }) =>
                handleFileUpload(file as File, onSuccess)
              }
            >
              <Button icon={<UploadOutlined />}>파일 선택</Button>
            </Upload>
          </div>
        </div>

        <div className="inputs">
          <Image
            className="inputTextIcon"
            src={userPlateIcon}
            alt="userPlate icon"
          />
          <p>차량 번호</p>
          <Input
            className="input"
            value={vehicleNumber}
            onChange={handleVehicleNumberChange}
            onBlur={(e) => {
              setPoint(e.target.value);
            }}
            placeholder="차량 번호를 입력하세요"
          />
        </div>

        <div className="pointInfos">
          <AiPoint
            score={score}
            setScore={setScore}
            point={point}
            setPoint={setPoint}
            payTableData={payTableData}
            setPayTableData={setPayTableData}
          />

          <p
            onClick={() => {
              handleTableModalOpen("vehicle");
            }}
          >
            내역보기
          </p>
        </div>
        <button
          className="passBtn"
          disabled={!vehicleNumber || !file || !score}
          onClick={() => {
            handleRegister(score);
          }}
        >
          등록하기
        </button>
      </div>
    </>
  );
};

export default Vehicle;
