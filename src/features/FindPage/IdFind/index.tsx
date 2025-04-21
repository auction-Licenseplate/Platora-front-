import { IdFindStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const IdFind = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      if (!values.name.trim() || !values.phone.trim()) {
        setUserId("이름과 전화번호를 입력해주세요.");
        return;
      }
      axios
        .post("http://15.164.52.122:5000/auth/findID", values)
        .then((res) => {
          if (res.data.message === "저장된 아이디 없음") {
            return setUserId("가입되지 않은 아이디입니다.");
          }
          if (res.data.email) {
            setUserId(res.data.email);
          }
        })
        .catch((error) => {
          console.error("에러 :", error);
        });
    },
  });

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    formik.setFieldValue("phone", value);
  };

  return (
    <IdFindStyled>
      <div className="loginForm-wrap">
        <form className="loginForm-container" onSubmit={formik.handleSubmit}>
          <div className="loginForm-idDiv">
            <div className="loginForm-textDiv">이름</div>
            <Input
              name="name"
              placeholder="이름을 입력해주세요"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="loginForm-idDiv">
            <div className="loginForm-textDiv">전화번호</div>
            <Input
              name="phone"
              placeholder="전화번호를 입력해주세요"
              value={formik.values.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="loginForm-findidDiv">{userId}</div>
          <div className="loginForm-findDiv">
            <span onClick={() => router.push("/find/pw")}>pw찾기</span>/
            <span onClick={() => router.push("/login")}>로그인 하기</span>/
            <span onClick={() => router.push("/join")}>회원가입</span>
          </div>
          <Button htmlType="submit">아이디 찾기</Button>
        </form>
      </div>
    </IdFindStyled>
  );
};

export default IdFind;
