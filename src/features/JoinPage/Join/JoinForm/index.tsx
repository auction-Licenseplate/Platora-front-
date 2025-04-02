import { JoinFormStyled } from "./styled";
import { Input, Button, Modal } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/util/validation";

const JoinForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 유효성 체크 상태 변수
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  // 에러 메시지 상태 변수
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  // 중복 여부 상태 변수
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
    setEmailError(isValid ? "" : "유효한 이메일을 입력해주세요.");
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    setIsPasswordValid(isValid);
    setPasswordError(
      isValid
        ? ""
        : "비밀번호는 최소한 10자 이상, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  const handlePasswordCheckChange = (e: any) => {
    const value = e.target.value;
    setPasswordCheck(value);
    const isValid = value === password;
    setIsPasswordCheckValid(isValid);
    setPasswordCheckError(isValid ? "" : "비밀번호가 일치하지 않습니다.");
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    const isValid = validateName(value);
    setIsNameValid(isValid);
    setNameError(isValid ? "" : "이름을 입력해주세요.");
  };

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
    setPhone(value);
    const isValid = validatePhone(value);
    setIsPhoneValid(isValid);
    setPhoneError(isValid ? "" : "전화번호는 13자이어야 합니다.");
  };

  // 중복 검사 함수 -> email, phone 중복 확인해서 중복이면 exists = true, 중복이 아니면 exists = false
  const handleDuplicateCheck = async (type: "email" | "phone") => {
    try {
      const data = type === "email" ? { email } : { phone };

      const response = await axios.post(
        `http://localhost:5000/auth/check/${type}`,
        data
      );
      if (response.data.exists) {
        if (type === "email") {
          setIsEmailDuplicate(true);
          setEmailError("이미 사용된 이메일입니다.");
        } else {
          setIsPhoneDuplicate(true);
          setPhoneError("이미 사용된 전화번호입니다.");
        }
      } else {
        if (type === "email") {
          setIsEmailDuplicate(false);
        } else {
          setIsPhoneDuplicate(false);
        }
        Modal.success({
          content: `사용 가능한 ${type}입니다.`,
        });
      }
    } catch (error) {
      console.error(`${type} 중복 검사 실패:`, error);
      Modal.error({
        content: `${type} 중복 검사 실패. 다시 시도해주세요.`,
      });
    }
  };

  // 버튼 활성화 여부 계산
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordCheckValid &&
    isPhoneValid &&
    isNameValid;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
      };
      axios
        .post("http://localhost:5000/auth/signup", data)
        .then((response) => {
          console.log("회원가입 성공:", response.data);
          const userId = response.data.userEmail;

          return axios.post("http://localhost:5000/users/userCheck", {
            user_id: userId,
            term: "이용약관",
          });
        })
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.error("회원가입 또는 이용약관 저장 실패:", error);
        });
    },
  });
  return (
    <JoinFormStyled className={clsx("joinFrom-wrap")}>
      <form className="joinForm-container" onSubmit={formik.handleSubmit}>
        <div className="joinform-divcontainer">
          <div className="join-div">
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                handleEmailChange(e);
                formik.handleChange(e);
              }}
              placeholder="abc123@xxx.com"
            />
            <div className="join-errormessage">{emailError}</div>
            <Button onClick={() => handleDuplicateCheck("email")}>
              이메일 중복 확인
            </Button>
          </div>
          <div className="join-div">
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
                formik.handleChange(e);
              }}
              placeholder="비밀번호를 입력해주세요"
            />
            <div className="join-errormessage">{passwordError}</div>
          </div>
          <div className="join-div">
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <Input
              type="password"
              id="passwordCheck"
              value={passwordCheck}
              onChange={(e) => {
                formik.handleChange(e);
                handlePasswordCheckChange(e);
              }}
              placeholder="비밀번호 확인"
            />
            <div className="join-errormessage">{passwordCheckError}</div>
          </div>
          <div className="join-div">
            <label htmlFor="name">이름</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                formik.handleChange(e);
                handleNameChange(e);
              }}
              placeholder="이름을 입력해주세요"
            />
            <div className="join-errormessage">{nameError}</div>
          </div>
          <div className="join-div">
            <label htmlFor="phone">전화번호</label>
            <Input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => {
                formik.handleChange(e);
                handlePhoneChange(e);
              }}
              placeholder="010-0000-0000"
            />
            <div className="join-errormessage">{phoneError}</div>
            <Button onClick={() => handleDuplicateCheck("phone")}>
              전화번호 중복 확인
            </Button>
          </div>
          <div className="joinForm-btnDiv">
            <Button
              htmlType="submit"
              disabled={!isFormValid || isEmailDuplicate || isPhoneDuplicate} // 각 입력의 유효성 상태에 기반하여 버튼을 활성화/비활성화
            >
              가입하기
            </Button>
          </div>
        </div>
      </form>
    </JoinFormStyled>
  );
};

export default JoinForm;
