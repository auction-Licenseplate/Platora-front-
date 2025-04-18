import { LoginStyled } from "./styled";
import LoginForm from "./LoginForm";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Login = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  return (
    <LoginStyled className={clsx("login-wrap")}>
      <div className="loginForm-container">
        <LoginForm />
        <div className="divider">
          <hr />
          <span className="loginform -socialtext">소셜 로그인</span>
          <hr />
        </div>
        <div className="loginForm-socialDiv">
          <NaverLogin />
          <KakaoLogin />
          <GoogleLogin />
        </div>
      </div>
    </LoginStyled>
  );
};

export default Login;
