import { exportPages } from "next/dist/export/worker";
import { LoginStyled } from "./styled";
import LoginForm from "./LoginForm";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
const Login = () => {
  return (
    <LoginStyled>
      <LoginForm />
      <NaverLogin />
      <KakaoLogin />
      <GoogleLogin />
    </LoginStyled>
  );
};

export default Login;
