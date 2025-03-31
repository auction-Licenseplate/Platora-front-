import { PwFindStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState } from "react";

const PwFind = () => {
  const [display, setDisplay] = useState<string>("none"); // 클래스
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        email: values.id,
        phone: values.phone,
      };
      axios // 가입된 유저 인지 본인 확인 요청
        .post("http://localhost:5000/auth/findpw", data) // 서버 URL
        .then((res) => {
          if (res.data.message === "200 유저정보없음") {
            alert("가입되지 않은 아이디입니다.");
          } else {
            console.log("비밀번호 입력받기");
            setDisplay("flex");
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
    onSubmit: (values) => {
      console.log(values);
      const data = {
        password: values.pw,
      };
      axios //새 비밀번호 업데이트 요청
        .post("http://localhost:5000/auth/pwfind/updatepw", data) // 서버 URL
        .then((res) => {
          if (res.data) {
            alert("가입되지 않은 아이디입니다.");
          } else {
            console.log("비밀번호 변경 성공", res.data);
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
            <div className="PwFind-textDiv">이름</div>
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
                router.push("/find/pw");
              }}
            >
              pw찾기
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
      <br></br>
      <div className="PwFind-container1">
        <form className="PwFind-form" onSubmit={PwFormik.handleSubmit}>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv1">새 비밀번호</div>
            <Input
              type="password"
              name="pw"
              onChange={PwFormik.handleChange}
              placeholder="이메일을 입력해주세요"
              value={PwFormik.values.pw}
            />
          </div>
          <div className="PwFind-idDiv">
            <div className="PwFind-textDiv1">새 비밀번호 재확인</div>
            <Input
              name="pwCheck"
              placeholder="전화번호를 입력해주세요"
              type="password"
              value={PwFormik.values.pwCheck} // 전화번호 필드의 값을 formik 상태에서 가져오기
              onChange={PwFormik.handleChange} // 전화번호 형식에 맞게 처리
            />
          </div>

          <Button htmlType="submit">비밀번호 변경하기</Button>
        </form>
      </div>
    </PwFindStyled>
  );
};

export default PwFind;
