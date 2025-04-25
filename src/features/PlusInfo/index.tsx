import { PlusInfoStyled } from "./styled";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import { Input, Button, Modal } from "antd";
import clsx from "clsx";
import { useState } from "react";
interface userData {
  userid?: string;
}
const PlusInfo = ({ userid }: userData) => {
  const router = useRouter();

  // 중복 여부 상태 변수
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      const data = {
        userID: userid,
        name: values.name,
        phone: values.phone,
      };
      axios
        .post("http://15.164.52.122/auth/social/plusinfo", data) // 서버 URL
        .then((res) => {
          router.push("/").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error("회원가입 실패 :", error);
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

  const handleDuplicateCheck = async () => {
    const type = "phone";
    try {
      const response = await axios.post(
        `http://15.164.52.122/auth/phoneCheck`,
        { phone: formik.values.phone }
      );

      if (response.data.exists) {
        setIsPhoneDuplicate(true);
        Modal.error({
          centered: true,
          content: "이미 사용 중인 전화번호입니다.",
        });
      } else {
        setIsPhoneDuplicate(false);
        Modal.success({
          centered: true,
          content: "사용 가능한 전화번호입니다.",
        });
      }
    } catch (error) {
      console.error("전화번호 중복 검사 실패:", error);
      Modal.error({
        centered: true,
        content: "전화번호 중복 검사 실패. 다시 시도해주세요.",
      });
    }
  };

  return (
    <PlusInfoStyled className={clsx("plusinfo-wrap")}>
      <div className="plusinfo-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="plusinfo-idDiv">
            <div className="plusinfo-textDiv">이름</div>
            <Input
              type="text"
              name="name"
              onChange={formik.handleChange}
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="plusinfo-idDiv">
            <div className="plusinfo-textDiv">전화번호</div>
            <Input
              id="phone"
              name="phone"
              placeholder="전화번호를 입력해주세요"
              type="text"
              value={formik.values.phone}
              onChange={handlePhoneChange}
            />
            <Button onClick={handleDuplicateCheck}>전화번호 중복 확인</Button>
          </div>
          <Button
            htmlType="submit"
            disabled={
              isPhoneDuplicate || !formik.values.phone || !formik.values.name
            }
          >
            회원가입
          </Button>
        </form>
      </div>
    </PlusInfoStyled>
  );
};

export default PlusInfo;
