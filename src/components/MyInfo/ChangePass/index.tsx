import Image from "next/image";
import { Input, Tooltip } from "antd";

// 이미지
import userPassIcon from "@/assets/images/userPassIcon.png";
import userPassCheckIcon from "@/assets/images/userPassCheckIcon.png";
import infoIcon from "@/assets/images/infoIcon.png";

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
  return (
    <>
      <div className="inputContainer">
        <div className="infoText">
          <p>비밀번호</p>

          <Tooltip
            title={
              <div>
                <p>
                  <strong>소셜 회원</strong>
                </p>
                <p className="pTag">
                  네이버, 카카오, 구글로 가입한 회원은 비밀번호를 변경할 수
                  없습니다.
                </p>

                <br />

                <p>
                  <strong>로컬 회원</strong>
                </p>
                <p className="pTag">비밀번호를 변경할 수 있습니다.</p>
                <p className="pTag">
                  숫자와 특수문자를 포함해 최소 10자 이상으로 설정해 주세요.
                </p>
              </div>
            }
            placement="bottom"
            overlayClassName="custom-tooltip"
          >
            <Image className="infoIcon" src={infoIcon} alt="info icon" />
          </Tooltip>
        </div>

        <div className="inputs passInputs">
          <Image
            className="inputTextIcon"
            src={userPassIcon}
            alt="userPass icon"
          />
          <p>비밀번호</p>
          <Input
            className="input"
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={provider !== null && provider !== ""}
          />
          {password && <p className="alert">{passwordError}</p>}
        </div>
        <div className="inputs">
          <Image
            className="inputTextIcon"
            src={userPassCheckIcon}
            alt="userPassCheck icon"
          />
          <p>비밀번호 확인</p>
          <Input
            className="input"
            placeholder="비밀번호를 다시 입력하세요"
            type="password"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            disabled={provider !== null && provider !== ""}
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
