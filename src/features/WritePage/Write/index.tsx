import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { WritePageStyled } from "./styled";
import { Breadcrumb, Input, Modal } from "antd";
import dynamic from "next/dynamic";
import { EditorState, ContentState } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ImageUpload from "./ImageUpload";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
) as any;

const validationSchema = Yup.object({
  title: Yup.string().required("제목은 필수 항목입니다."),
});

const WriteContainer = ({ label, name, setFieldValue, image }: any) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 파일 보내기
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const isMounted = useRef(true);
  const modalShown = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (token === "" || !token) return;

    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `http://15.164.52.122/admins/getStatus`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const ownershipStatus = response.data;

        if (
          isMounted.current &&
          !modalShown.current &&
          ownershipStatus.message === "차량정보 없음"
        ) {
          modalShown.current = true; // 모달 표시했음을 기록
          Modal.warning({
            title: "공인 인증서 필요",
            content: (
              <>
                <p>마이페이지에서 공인 인증서를 등록해주세요.</p>
                <Breadcrumb style={{ marginTop: 16 }}>
                  <Breadcrumb.Item>
                    <a href="/" target="_blank">
                      <HomeOutlined />
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/myPage?menu=myInfo" target="_blank">
                      <UserOutlined />
                      <span style={{ marginLeft: 4 }}>내 계정</span>
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>VEHICLE 등록하기</Breadcrumb.Item>
                </Breadcrumb>
              </>
            ),
            onOk: () => {
              if (isMounted.current) {
                router.push({
                  pathname: "/myPage",
                  query: { menu: "myInfo" },
                });
              }
            },
          });
        } else if (
          !modalShown.current &&
          ownershipStatus.message === "승인된 차량 없음"
        ) {
          modalShown.current = true; // 모달 표시했음을 기록
          Modal.warning({
            centered: true,
            title: "공인 인증서 승인 요청",
            content: (
              <>
                <p>공인 인증서 승인 후 작성이 가능합니다.</p>
                <p>내역을 확인하여 주세요.</p>
                <Breadcrumb style={{ marginTop: 16 }}>
                  <Breadcrumb.Item>
                    <a href="/" target="_blank">
                      <HomeOutlined />
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/myPage?menu=myInfo" target="_blank">
                      <UserOutlined />
                      <span style={{ marginLeft: 4 }}>내 계정</span>
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>VEHICLE 등록하기</Breadcrumb.Item>
                </Breadcrumb>
              </>
            ),
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
        "http://15.164.52.122/vehicles/addWrite",
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
          centered: true,
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
      } else if (response.data.message === "만족하는 차량 없음") {
        Modal.error({
          centered: true,
          title: "차량 없음",
          content: "입력하신 번호판의 차량이 존재하지 않습니다.",
        });
      }
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  return (
    <WritePageStyled className={clsx("main-wrap")}>
      <div className="writeContent">
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
                `http://15.164.52.122/vehicles/checkApprovedPlate?plate=${values.title}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
              );

              // 다른 유저 번호판일 경우 true
              if (existing.data.exists.anotherUser) {
                Modal.error({
                  centered: true,
                  title: "경매 등록 불가",
                  content: (
                    <>
                      <p>해당 번호판은 다른 사용자가 이미 작성한 차량입니다.</p>
                      <p>작성 권한이 없습니다.</p>
                    </>
                  ),
                });
                return;
              }

              // 등록 안된 경우 false
              if (!existing.data.exists.isApproved) {
                Modal.error({
                  centered: true,
                  title: "등록 불가",
                  content: (
                    <>
                      <p>
                        해당 번호판은 아직 승인되지 않았거나 등록되지 않은
                        번호판입니다. <br /> 내역을 확인하여 주세요.
                      </p>
                      <Breadcrumb style={{ marginTop: 16 }}>
                        <Breadcrumb.Item>
                          <a href="/" target="_blank">
                            <HomeOutlined />
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a href="/myPage?menu=myInfo" target="_blank">
                            <UserOutlined />
                            <span style={{ marginLeft: 4 }}>내 계정</span>
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>VEHICLE 등록하기</Breadcrumb.Item>
                      </Breadcrumb>
                    </>
                  ),
                });

                return;
              }

              // 등록된 번호판일 경우 true
              if (existing.data.exists.alreadyWritten) {
                Modal.confirm({
                  centered: true,
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

              if (
                existing.data.exists.isApproved &&
                !existing.data.exists.alreadyWritten &&
                !existing.data.exists.anotherUser
              ) {
                sendVehicleData(formData);
              }
            } catch (error) {
              console.error("저장 실패", error);
            }
          }}
        >
          {({ setFieldValue, values, errors, touched }) => {
            const isFormValid =
              values.title &&
              values.frontImage &&
              values.sideImage1 &&
              values.sideImage2 &&
              editorState.getCurrentContent().hasText();

            useEffect(() => {
              setIsButtonDisabled(!isFormValid);
            }, [isFormValid]);
            return (
              <Form className="writes">
                <div className="writeInput">
                  <Field
                    name="title"
                    type="text"
                    placeholder="등록된 번호판을 입력하세요"
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

                <button
                  className="submitBtn"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  등록
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </WritePageStyled>
  );
};

export default WriteContainer;
