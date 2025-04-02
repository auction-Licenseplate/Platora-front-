import Image from "next/image";
import { Button, Input, Upload } from "antd";

// 이미지
import vehicleLogo from "@/assets/images/vehicleLogo.png";
import vehicleBlack from "@/assets/images/vehicleLogo(black).png";
import { UploadOutlined } from "@ant-design/icons";

const Vehicle = ({
  isDarkMode,
  handleTableModalOpen,
  vehicleNumber,
  handleVehicleNumberChange,
  handleFileUpload,
  file,
  handleRegister,
}) => {
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
          <Input
            className="input"
            value={vehicleNumber}
            onChange={handleVehicleNumberChange}
            placeholder="차량 번호를 입력하세요"
          />
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
          disabled={!vehicleNumber || !file}
          onClick={handleRegister}
        >
          등록하기
        </button>
      </div>
    </>
  );
};

export default Vehicle;
