import { useEffect, useState } from "react";
import clsx from "clsx";
import { WritePageStyled } from "./styled";
import { Input, Modal } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, ContentState } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
) as any;

const validationSchema = Yup.object({
  title: Yup.string().required("제목은 필수 항목입니다."),
  frontImage: Yup.mixed().required("정면 사진이 필요합니다."),
  sideImage1: Yup.mixed().required("측면1 사진이 필요합니다."),
  sideImage2: Yup.mixed().required("측면2 사진이 필요합니다."),
});

const WriteContainer = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("차량 연도:\n차량 상태:\n기타 정보:")
    )
  );

  useEffect(() => {}, []);

  return (
    <WritePageStyled className={clsx("main-wrap")}>
      <div className="writeContent">
        <h1>Write</h1>

        <Formik
          initialValues={{
            title: "",
            frontImage: null,
            sideImage1: null,
            sideImage2: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append(
              "car_info",
              editorState.getCurrentContent().getPlainText()
            );
            if (values.frontImage !== null)
              formData.append("car_img", values.frontImage);
            if (values.sideImage1 !== null)
              formData.append("car_img", values.sideImage1);
            if (values.sideImage2 !== null)
              formData.append("car_img", values.sideImage2);

            try {
              formData.forEach((value, key) => {
                console.log(key, value);
              });
              const response = await axios.post(
                "http://localhost:5000/vehicles/addWrite",
                formData,
                {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.data.message === "작성글 저장완료") {
                console.log("저장 성공", response.data);
                const imagePaths = response.data.data.images;
              }
            } catch (error) {
              console.error("저장 실패", error);
            }
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <div className="writeInput">
                <label>제목</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="번호판을 입력하세요"
                  as={Input}
                />
                {errors.title && touched.title && (
                  <div className="error">{errors.title}</div>
                )}
              </div>

              <div className="writeImgInputs">
                <ImageUpload
                  label="정면"
                  name="frontImage"
                  setFieldValue={setFieldValue}
                  image={values.frontImage}
                />
                <ImageUpload
                  label="측면 1"
                  name="sideImage1"
                  setFieldValue={setFieldValue}
                  image={values.sideImage1}
                />
                <ImageUpload
                  label="측면 2"
                  name="sideImage2"
                  setFieldValue={setFieldValue}
                  image={values.sideImage2}
                />
              </div>

              <Editor
                className="editorBox"
                toolbar={{ options: ["inline", "textAlign", "history"] }}
                placeholder="내용을 작성해주세요."
                localization={{ locale: "ko" }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
              />

              <button className="saveBtn" type="submit">
                등록
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </WritePageStyled>
  );
};

const ImageUpload = ({ label, name, setFieldValue, image }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  return (
    <div className="writePreInput">
      <label>{label}</label>
      <Input type="file" accept="image/*" onChange={handleChange} />
      <div className="previewContainer">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt={label}
            className="previewImg"
          />
        ) : (
          <span>이미지 선택</span>
        )}
      </div>
    </div>
  );
};

export default WriteContainer;
