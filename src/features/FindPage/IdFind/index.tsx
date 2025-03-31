import { IdFindStyled } from "./styled";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useState } from "react";

const IdFind = () => {
  const [userId, serUserId] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        name: values.name,
        phone: values.phone,
      };
      axios // 아이디 찾기 요청
        .post("http://localhost:5000/auth/login", data) // 서버 URL
        .then((res) => {
          if ((res.data.message = "200 유저정보없음")) {
            alert("가입되지 않은 아이디입니다.");
          }
          if ((res.data.message = "200")) {
            console.log("아이디 찾기 성공", res.data);
            serUserId(res.data.userId);
          }
        })
        .catch((error) => {
          console.error("에러 :", error);
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
    <IdFindStyled className={clsx("IdFind-wrap")}>
      <div className="IdFind-container">
        <form className="IdFind-form" onSubmit={formik.handleSubmit}>
          <div className="IdFind-idDiv">
            <div className="IdFind-textDiv">이름</div>
            <Input
              type="text"
              name="name"
              onChange={formik.handleChange}
              placeholder="이름을 입력해주세요"
              value={formik.values.name}
            />
          </div>
          <div className="IdFind-idDiv">
            <div className="IdFind-textDiv">전화번호</div>
            <Input
              name="phone"
              placeholder="전화번호를 입력해주세요"
              type="text"
              value={formik.values.phone} // 전화번호 필드의 값을 formik 상태에서 가져오기
              onChange={handlePhoneChange} // 전화번호 형식에 맞게 처리
            />
          </div>
          <br></br>
          <div className="IdFind-findDiv">
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
              로그인 하기
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
          <Button htmlType="submit">아이디 찾기</Button>
        </form>
      </div>
      <div>{userId}</div>
    </IdFindStyled>
  );
};

export default IdFind;
