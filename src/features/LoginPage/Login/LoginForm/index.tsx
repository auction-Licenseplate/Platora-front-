import { LoginFormStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@/store/userSlice";
import { RootState } from "@/store/store";
import { request } from "http";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.userToken);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      axios
        .post("http://localhost:5000/auth/login", data, {
          withCredentials: true,
        }) // 서버 URL
        .then((res) => {
          dispatch(setUserToken(res.data.token));
          router.push("/");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  });
  return (
    <LoginFormStyled className={clsx("loginForm-wrap")}>
      <div className="loginForm-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="loginForm-idDiv">
            <div className="loginForm-textDiv">id</div>
            <Input
              type="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="abc123@xxx.com"
            />
          </div>
          <div className="loginForm-idDiv">
            <div className="loginForm-textDiv">pw</div>
            <Input
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onChange={formik.handleChange}
            />
          </div>
          <div className="loginForm-findDiv">
            <span
              onClick={() => {
                router.push("/find/id");
              }}
            >
              id찾기
            </span>
            /
            <span
              onClick={() => {
                router.push("/find/pw");
              }}
            >
              pw찾기
            </span>
            /
            <span
              onClick={() => {
                router.push("/join");
              }}
            >
              회원가입
            </span>
          </div>
          <Button htmlType="submit">로그인</Button>
        </form>
      </div>
    </LoginFormStyled>
  );
};

export default LoginForm;
