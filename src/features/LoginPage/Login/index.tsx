import { LoginStyled } from "./styled";
import LoginForm from "./LoginForm";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import clsx from "clsx";

const Login = () => {
  return (
    <LoginStyled className={clsx("login-wrap")}>
      <LoginForm />
      <div className="divider">
        <hr />
        <span>소셜 로그인</span>
        <hr />
      </div>
      <div className="loginForm-socialDiv">
        <NaverLogin />
        <KakaoLogin />
        <GoogleLogin />
      </div>
    </LoginStyled>
  );
};

export default Login;
