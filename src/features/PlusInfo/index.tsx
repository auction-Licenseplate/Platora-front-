import { PlusInfoStyled } from "./styled";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import { Input, Button } from "antd";
import clsx from "clsx";
const PlusInfo = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      const data = {
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
              placeholder="비밀번호를 입력해주세요"
              type="text"
              onChange={formik.handleChange}
            />
          </div>
          <Button htmlType="submit">회원가입</Button>
        </form>
      </div>
    </PlusInfoStyled>
  );
};

export default PlusInfo;
