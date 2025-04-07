import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { WritePageStyled } from "./styled";
import { Breadcrumb, Input, Modal } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, ContentState } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

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

const WriteContainer = ({ label, name, setFieldValue, image }: any) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 파일 보내기
  const [localFile, setLocalFile] = useState<File | null>(null);
  const isMounted = useRef(true);

  // 제목 보내주기 (이미 있는 건지 구분하려고)
  const [titleValue, setTitleValue] = useState("");

  useEffect(() => {
    isMounted.current = true;

    // 페이지 내 새로고침 시 redux 값 초기화 => 이를 방지
    if (token === null || token === undefined) return;

    const fetchStatus = async () => {
      if (!token) {
        if (isMounted.current) {
          router.push("/login");
        }
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/admins/getStatus`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const ownershipStatus = response.data.ownership_status;

        if (
          isMounted.current &&
          (ownershipStatus === "pending" || ownershipStatus === "waiting")
        ) {
          Modal.warning({
            title: "공인 인증서 필요",
            content: "마이페이지에서 공인 인증서를 등록해주세요.",
            onOk: () => {
              if (isMounted.current) {
                router.push({
                  pathname: "/myPage",
                  query: { menu: "myInfo" },
                });
              }
            },
          });
        }
      } catch (error) {
        if (isMounted.current) {
          console.error(error);
        }
      }
    };

    fetchStatus();

    return () => {
      isMounted.current = false;
    };
  }, [token]);

  // 메모리 누수 방지
  useEffect(() => {
    let objectUrl: string | null = null;

    if (localFile) {
      objectUrl = URL.createObjectURL(localFile);
      // 사용하고 나서 메모리 해제 필요함
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [localFile]);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("차량 연도:\n차량 상태:\n기타 정보:")
    )
  );

  const sendVehicleData = async (formData: FormData) => {
    try {
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
        Modal.success({
          title: "저장 완료하였습니다!",
          content: (
            <p>
              승인 후 해당 이메일로 보내드리겠습니다. <br />
              감사합니다.
            </p>
          ),
          onOk: () => {
            router.push("/");
          },
        });
      }
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

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
              const existing = await axios.get(
                `http://localhost:5000/vehicles/checkApprovedPlate?plate=${values.title}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
              );

              console.log(existing.data.exists);

              if (!existing.data.exists.isApproved) {
                Modal.error({
                  title: "등록 불가",
                  content: (
                    <>
                      <p>
                        해당 번호판은 아직 승인되지 않았거나 등록되지 않은
                        번호판입니다. <br /> 내역을 확인하여 주세요.
                      </p>
                      <Breadcrumb
                        style={{ marginTop: 16 }}
                        items={[
                          {
                            title: (
                              <a href="/" target="_blank">
                                <HomeOutlined />
                              </a>
                            ),
                          },
                          {
                            title: (
                              <a href="/myPage?menu=myInfo" target="_blank">
                                <UserOutlined />
                                <span style={{ marginLeft: 4 }}>내 계정</span>
                              </a>
                            ),
                          },
                          {
                            title: "VEHICLE 내역보기",
                          },
                        ]}
                      />
                    </>
                  ),
                });

                return;
              }

              if (existing.data.exists.alreadyWritten) {
                Modal.confirm({
                  title: "이미 등록된 번호판입니다",
                  content: (
                    <>
                      <p>해당 번호판은 이미 작성된 글이 존재합니다.</p>
                      <p>덮어씌우시겠습니까?</p>
                    </>
                  ),
                  onOk: () => {
                    sendVehicleData(formData);
                  },
                  onCancel: () => {
                    return;
                  },
                });
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
  const [localFile, setLocalFile] = useState<File | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (localFile && isMounted) {
      setFieldValue(name, localFile);
    }

    return () => {
      isMounted = false;
    };
  }, [localFile, name, setFieldValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLocalFile(file);
    }
  };

  return (
    <div className="writePreInput">
      <label>{label}</label>
      <Input type="file" accept="image/*" onChange={handleChange} />
      <div className="previewContainer">
        {localFile || image ? (
          <img
            src={URL.createObjectURL(localFile || image)}
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
