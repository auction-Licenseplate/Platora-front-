import Image from "next/image";
import { Button, Input, Upload } from "antd";
import AiPoint from "@/features/MyPageManeger/AiPoint";
// 이미지
import vehicleLogo from "@/assets/images/vehicleLogo.png";
import vehicleBlack from "@/assets/images/vehicleLogo(black).png";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { myInfo } from "@/util/useMyInfo";

const Vehicle = ({
  isDarkMode,
  handleTableModalOpen,
  vehicleNumber,
  handleVehicleNumberChange,
  handleFileUpload,
  file,
  handleRegister,
}) => {
  const { score, setScore } = myInfo("");
  const [point, setPoint] = useState("");

  return (
    <>
      <Image
        key={isDarkMode ? "dark" : "light"}
        src={isDarkMode ? vehicleLogo : vehicleBlack}
        alt="vehicle logo"
        width={200}
      />
      <div className="inputContainer">
        <div className="inputs">
          <h3>차량 번호</h3>
          <div className="vehicleInputs">
            <Input
              className="vehicleInput"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              onBlur={(e) => {
                setPoint(e.target.value);
              }}
              placeholder="차량 번호를 입력하세요"
            />
            <AiPoint
              score={score}
              setScore={setScore}
              point={point}
              setPoint={setPoint}
            />
          </div>
        </div>

        <div className="inputs">
          <h3>공인 인증서</h3>
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
        <div className="pointInfos">
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
