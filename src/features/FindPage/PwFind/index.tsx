import { PwFindStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState } from "react";
import { validatePassword } from "@/util/validation";

const PwFind = () => {
  const [user, setUser] = useState("");
  const [display, setDisplay] = useState<string>("none");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: "",
      phone: "",
    },
    onSubmit: (values) => {
      const data = {
        email: values.id,
        phone: values.phone,
      };
      axios
        .post("http://15.164.52.122/auth/findpw", data)
        .then((res) => {
          if (res.data.message === "저장된 비밀번호 없음") {
            alert("가입되지 않은 아이디입니다.");
            setDisplay("none");
          } else {
            setDisplay("flex");
            setUser(res.data.userID);
          }
        })
        .catch((error) => {
          console.error("비밀번호 찾기 실패 :", error);
        });
    },
  });

  const PwFormik = useFormik({
    initialValues: {
      pw: "",
      pwCheck: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.pw) {
        errors.pw = "비밀번호를 입력해주세요.";
      } else if (!validatePassword(values.pw)) {
        errors.pw =
          "비밀번호는 최소 10자 이상, 숫자와 특수문자가 포함되어야 합니다.";
      }

      if (!values.pwCheck) {
        errors.pwCheck = "비밀번호 확인을 입력해주세요.";
      } else if (values.pw !== values.pwCheck) {
        errors.pwCheck = "비밀번호가 일치하지 않습니다.";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        password: values.pw,
        userID: user,
      };
      axios
        .post("http://15.164.52.122/auth/pwfind/updatepw", data)
        .then((res) => {
          if (res.data.message === "사용자 없음") {
            alert("비밀번호 업데이트 실패");
          } else {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("비밀번호 변경 실패 :", error);
        });
    },
  });

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    formik.setFieldValue("phone", value);
  };

  return (
    <PwFindStyled className={clsx("loginForm-wrap")} display={display}>
      <form className="loginForm-container" onSubmit={formik.handleSubmit}>
        <div className="loginForm-idDiv">
          <div className="loginForm-textDiv">이메일</div>
          <Input
            type="text"
            name="id"
            onChange={formik.handleChange}
            placeholder="이메일을 입력해주세요"
            value={formik.values.id}
          />
        </div>
        <div className="loginForm-idDiv">
          <div className="loginForm-textDiv">전화번호</div>
          <Input
            name="phone"
            placeholder="전화번호를 입력해주세요"
            type="text"
            value={formik.values.phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="loginForm-findDiv">
          <span onClick={() => router.push("/find/id")}>id찾기</span>/
          <span onClick={() => router.push("/login")}>로그인하기</span>/
          <span onClick={() => router.push("/join")}>회원가입</span>
        </div>

        <Button htmlType="submit">비밀번호 찾기</Button>
      </form>

      <form className="loginForm-container1" onSubmit={PwFormik.handleSubmit}>
        <div className="loginForm-idDiv">
          <div className="loginForm-textDiv">새 비밀번호</div>
          <Input
            type="password"
            name="pw"
            onChange={PwFormik.handleChange}
            placeholder="새 비밀번호를 입력해주세요"
            value={PwFormik.values.pw}
          />
          <div className="pwfind-error">{PwFormik.errors.pw || ""}</div>
        </div>
        <div className="loginForm-idDiv">
          <div className="loginForm-textDiv">새 비밀번호 재확인</div>
          <Input
            type="password"
            name="pwCheck"
            placeholder="비밀번호 재확인을 입력해주세요"
            value={PwFormik.values.pwCheck}
            onChange={PwFormik.handleChange}
          />
          <div className="pwfind-error">{PwFormik.errors.pwCheck || ""}</div>
        </div>

        <Button htmlType="submit" disabled={!PwFormik.isValid}>
          비밀번호 변경하기
        </Button>
      </form>
    </PwFindStyled>
  );
};

export default PwFind;
