import Image from "next/image";
import { Input, Tooltip } from "antd";

// 이미지
import infoIcon from "@/assets/images/infoIcon.png";
import userInfoIcon from "@/assets/images/userInfoIcon.png";
import userPhoneIcon from "@/assets/images/userPhoneIcon.png";
import userEmailIcon from "@/assets/images/userEmailIcon.png";

const MyInfor = ({ isDarkMode, userInfo }) => {
  return (
    <>
      <div className="inputContainer">
        <div className="infoText">
          <p> 기본 정보 </p>

          <Tooltip
            title={
              <div>
                <p>
                  <strong>가입 시 입력한 정보입니다.</strong>
                </p>
                <p className="pTag">
                  정보는 본인 확인 용도로만 사용되며, 수정할 수 없습니다.
                </p>
              </div>
            }
            placement="bottom"
            classNames={{ root: "custom-tooltip" }}
          >
            <Image className="infoIcon" src={infoIcon} alt="info icon" />
          </Tooltip>
        </div>
        <div className="inputs readOnly">
          <Image
            className="inputTextIcon"
            src={userInfoIcon}
            alt="userInfo icon"
          />
          <p>이름</p>
          <Input
            className="input"
            placeholder="이름"
            value={userInfo.name}
            readOnly
          />
        </div>
        <div className="inputs readOnly">
          <Image
            className="inputTextIcon"
            src={userPhoneIcon}
            alt="userPhone icon"
          />
          <p>전화번호</p>
          <Input
            className="input"
            placeholder="전화번호"
            value={userInfo.phone}
            readOnly
          />
        </div>
        <div className="inputs readOnly">
          <Image
            className="inputTextIcon"
            src={userEmailIcon}
            alt="userEmail icon"
          />
          <p>이메일</p>
          <Input
            className="input"
            placeholder="이메일"
            value={userInfo.email}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default MyInfor;
