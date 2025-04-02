import Image from "next/image";
import { Input } from "antd";

// 이미지
import pointLogo from "@/assets/images/pointLogo.png";
import pointBlack from "@/assets/images/pointLogo(black).png";

const MyPoint = ({
  isDarkMode,
  formattedPoint,
  handleTableModalOpen,
  setRefundModalOpen,
  setPointModalOpen,
}) => {
  return (
    <>
      <Image
        key={isDarkMode ? "dark" : "light"}
        src={isDarkMode ? pointLogo : pointBlack}
        alt="point logo"
        width={150}
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
  );
};

export default MyPoint;
