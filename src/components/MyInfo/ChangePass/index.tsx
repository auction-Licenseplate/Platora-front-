import Image from "next/image";
import { Input } from "antd";

// 이미지
import passwordLogo from "@/assets/images/passwordLogo.png";
import passwordBlack from "@/assets/images/passwordLogo(black).png";

const ChangePass = ({
  isDarkMode,
  password,
  handlePasswordChange,
  provider,
  passwordError,
  passwordCheck,
  handlePasswordCheckChange,
  passwordCheckError,
  pwvalue,
}) => {
  console.log(provider);
  return (
    <>
      <Image
        key={isDarkMode ? "dark" : "light"}
        src={isDarkMode ? passwordLogo : passwordBlack}
        alt="password logo"
        width={250}
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
            disabled={provider !== null}
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
            disabled={provider !== null}
          />
          {passwordCheck && <p className="alertCheck">{passwordCheckError}</p>}
        </div>
        <button
          className="passBtn"
          onClick={pwvalue}
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
  );
};

export default ChangePass;
