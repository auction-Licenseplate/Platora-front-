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
  const [display, setDisplay] = useState<string>("none"); // 클래스

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
      axios // 가입된 유저 인지 본인 확인 요청
        .post("http://localhost:5000/auth/findpw", data) // 서버 URL
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
          console.error("로그인 실패 :", error);
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

      // 비밀번호 유효성 검사
      if (!values.pw) {
        errors.pw = "비밀번호를 입력해주세요.";
      } else if (!validatePassword(values.pw)) {
        errors.pw =
          "비밀번호는 최소 10자 이상, 숫자와 특수문자가 포함되어야 합니다.";
      }

      // 비밀번호 확인 검사
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
      axios //새 비밀번호 업데이트 요청
        .post("http://localhost:5000/auth/pwfind/updatepw", data) // 서버 URL
        .then((res) => {
          if (res.data.message === "사용자 없음") {
            alert("비밀번호 업데이트 실패");
          } else {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("로그인 실패 :", error);
        });
    },
  });

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // 숫자만 허용
    if (value.length > 11) {
      value = value.slice(0, 11); // 최대 11자리까지 허용
    }
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    // 폼 상태 업데이트
    formik.setFieldValue("phone", value); // 포맷팅된 값을 formik 상태에 반영
  };

  return (
    <PwFindStyled className={clsx("PwFind-wrap")} display={display}>
      <div className="PwFind-container">
        <form className="PwFind-form" onSubmit={formik.handleSubmit}>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv">이메일</div>
            <Input
              type="text"
              name="id"
              onChange={formik.handleChange}
              placeholder="이메일을 입력해주세요"
              value={formik.values.id}
            />
          </div>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv">전화번호</div>
            <Input
              name="phone"
              placeholder="전화번호를 입력해주세요"
              type="text"
              value={formik.values.phone} // 전화번호 필드의 값을 formik 상태에서 가져오기
              onChange={handlePhoneChange} // 전화번호 형식에 맞게 처리
            />
          </div>

          <div className="PwFind-findDiv">
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
                router.push("/login");
              }}
            >
              로그인하기
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

          <Button htmlType="submit">비밀번호 변경하기</Button>
        </form>
      </div>
      <br />
      <div className="PwFind-container1">
        <form className="PwFind-form" onSubmit={PwFormik.handleSubmit}>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv1">새 비밀번호</div>
            <Input
              type="password"
              name="pw"
              onChange={PwFormik.handleChange}
              placeholder="새 비밀번호를 입력해주세요"
              value={PwFormik.values.pw}
            />
            <div className="pwfind-error" style={{ color: "red" }}>
              {PwFormik.errors.pw || ""}
            </div>
          </div>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv1">새 비밀번호 재확인</div>
            <Input
              type="password"
              name="pwCheck"
              placeholder="비밀번호 재확인을 입력해주세요"
              value={PwFormik.values.pwCheck}
              onChange={PwFormik.handleChange}
            />
            <div className="pwfind-error" style={{ color: "red" }}>
              {PwFormik.errors.pwCheck || ""}
            </div>
          </div>

          <Button htmlType="submit" disabled={!PwFormik.isValid}>
            비밀번호 변경하기
          </Button>
        </form>
      </div>
    </PwFindStyled>
  );
};

export default PwFind;
