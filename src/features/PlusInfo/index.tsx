import { PlusInfoStyled } from "./styled";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import { Input, Button } from "antd";
import clsx from "clsx";
interface userData {
  userid?: string;
}
const PlusInfo = ({ userid }: userData) => {
  const router = useRouter();

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
        .post("http://localhost:5000/auth/social/plusinfo", data) // 서버 URL
        .then((res) => {
          router.push("/");
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
              placeholder="abc123@xxx.com"
            />
          </div>
          <div className="plusinfo-idDiv">
            <div className="plusinfo-textDiv">전화번호</div>
            <Input
              name="phone"
              placeholder="전화번호를 입력해주세요"
              type="text"
              value={formik.values.phone} // 상태에 있는 phone 값을 입력란에 넣어줍니다.
              onChange={handlePhoneChange} // 전화번호 포맷팅을 먼저 처리
            />
          </div>
          <Button htmlType="submit">회원가입</Button>
        </form>
      </div>
    </PlusInfoStyled>
  );
};

export default PlusInfo;
