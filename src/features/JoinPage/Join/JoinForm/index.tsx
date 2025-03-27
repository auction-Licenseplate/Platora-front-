import { JoinFormStyled } from "./styled";
import { useFormik } from "formik";
import { Input, Button } from "antd";
import clsx from "clsx";
import * as Yup from "yup";
import { useEffect, Suspense } from "react";
interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phone: string;
}
// yup 라이브러리 유효성 검사 간편
const validationSchema = Yup.object({
  email: Yup.string()
    .email("유효한 이메일을 입력해주세요.")
    .required("이메일을 입력해주세요."),
  password: Yup.string()
    .min(10, "비밀번호는 10자 이상이어야 합니다.")
    .matches(/[a-z]/, "비밀번호는 최소한 1개의 소문자를 포함해야 합니다.")
    .matches(/[0-9]/, "비밀번호는 최소한 1개의 숫자를 포함해야 합니다.")
    .matches(
      /[^a-zA-Z0-9]/,
      "비밀번호는 최소한 1개의 특수문자를 포함해야 합니다."
    )
    .required("비밀번호를 입력해주세요."),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
  name: Yup.string().required("이름을 입력해주세요."),
  phone: Yup.string()
    .length(13, "전화번호는 11자리여야 합니다.") // 형식에 맞는 길이 설정
    .required("전화번호를 입력해주세요."),
});

const JoinForm = () => {
  const userFormik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //전화번호 자동 - 붙이는 함수
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // 숫자만 남기기

    if (value.length > 11) {
      value = value.slice(0, 11); // 13글자 초과시 잘라내기
    }

    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2"); // 011-1111 형태
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3"); // 011-1111-1111 형태
    }

    userFormik.setFieldValue("phone", value);
  };

  return (
    <JoinFormStyled className={clsx("joinFrom-wrap")}>
      <form onSubmit={userFormik.handleSubmit}>
        <div className="join-div">
          <label htmlFor="email">이메일</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={userFormik.values.email}
            onChange={userFormik.handleChange}
            placeholder="abc123@xxx.com"
          />
          <div className="join-errormessage">
            {userFormik.errors.email || ""}
          </div>
        </div>
        <div className="join-div">
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={userFormik.values.password}
            onChange={userFormik.handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <div className="join-errormessage">
            {userFormik.errors.password || ""}
          </div>
        </div>
        <div className="join-div">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={userFormik.values.passwordCheck}
            onChange={userFormik.handleChange}
            placeholder="비밀번호 확인"
          />
          <div className="join-errormessage">
            {userFormik.errors.passwordCheck || ""}
          </div>
        </div>
        <div className="join-div">
          <label htmlFor="name">이름</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={userFormik.values.name}
            onChange={userFormik.handleChange}
            placeholder="이름을 입력해주세요"
          />
          <div className="join-errormessage">
            {userFormik.errors.name || ""}
          </div>
        </div>
        <div className="join-div">
          <label htmlFor="phone">전화번호</label>
          <div className="joinForm-phoneInput">
            <Input
              type="text"
              id="phone"
              name="phone"
              value={userFormik.values.phone}
              onChange={handlePhoneChange}
              placeholder="010"
            />
            <div className="join-errormessage">
              {userFormik.errors.phone || ""}
            </div>
          </div>
        </div>
        <Button htmlType="submit">가입하기</Button>
      </form>
    </JoinFormStyled>
  );
};

export default JoinForm;
