import { LoginFormStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
const LoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("http://localhost:5000/auth/login", data) // 서버 URL
        .then((response) => {
          console.log("로그인 성공", response.data);
          router.push("/");
        })
        .catch((error) => {
          console.error("로그인 실패 :", error);
        });
    },
  });
  return (
    <LoginFormStyled>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            id
            <Input
              type="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="abc123@xxx.com"
            />
          </div>
          <div>
            pw
            <Input
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onChange={formik.handleChange}
            />
          </div>
          <Button htmlType="submit">로그인</Button>
        </form>
      </div>
    </LoginFormStyled>
  );
};

export default LoginForm;
