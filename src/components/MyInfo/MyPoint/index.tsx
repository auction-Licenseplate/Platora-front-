import Image from "next/image";
import { Input, Tooltip } from "antd";

// 이미지
import pointLogo from "@/assets/images/pointLogo.png";
import pointBlack from "@/assets/images/pointLogo(black).png";

import infoIcon from "@/assets/images/infoIcon.png";
import userPointIcon from "@/assets/images/userPointIcon.png";

const MyPoint = ({
  isDarkMode,
  formattedPoint,
  handleTableModalOpen,
  setRefundModalOpen,
  setPointModalOpen,
}) => {
  return (
    <>
      <div className="inputContainer">
        <div className="infoText">
          <p>포인트</p>

          <Tooltip
            title={
              <div>
                <p>
                  <strong>포인트</strong>
                </p>
                <p className="pTag">
                  반환 시 정확한 계좌번호와 카드사를 입력해 주세요.
                </p>
                <p className="pTag">
                  내역보기를 통해 포인트 정보를 확인할 수 있습니다.
                </p>
              </div>
            }
            placement="bottom"
            overlayClassName="custom-tooltip"
          >
            <Image className="infoIcon" src={infoIcon} alt="info icon" />
          </Tooltip>
        </div>

        <div className="inputs readOnly">
          <Image
            className="inputTextIcon"
            src={userPointIcon}
            alt="userPoint icon"
          />
          <p>포인트</p>
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
              setPointModalOpen(true);
            }}
          >
            충전하기
          </p>

          <p
            onClick={() => {
              handleTableModalOpen("refund");
            }}
          >
            내역보기
          </p>
        </div>
      </div>
    </>
  );
};

export default MyPoint;
