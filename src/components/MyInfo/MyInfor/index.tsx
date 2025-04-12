import Image from "next/image";
import { Input } from "antd";

// 이미지
import accountLogo from "@/assets/images/accountLogo.png";
import accountBlack from "@/assets/images/myAccountLogo(black).png";

const MyInfor = ({ isDarkMode, userInfo }) => {
  return (
    <>
      {/* <Image
        key={isDarkMode ? "dark" : "light"}
        src={isDarkMode ? accountLogo : accountBlack}
        alt="account logo"
        width={300}
      /> */}
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
  );
};

export default MyInfor;
