import { useEffect, useState } from "react";
import clsx from "clsx";
import { WritePageStyled } from "./styled";
import { Input } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, ContentState } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// { withCredentials: true },

// 서버 사이드 렌더링을 하지 않도록 설정 -> 클라이언트 측에서만 로드
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
) as any;

const WriteContainer = () => {
  // 에디터 내용 저장
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 이미지 프리뷰
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [sideImage1, setSideImage1] = useState<string | null>(null);
  const [sideImage2, setSideImage2] = useState<string | null>(null);

  // 프리뷰
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 에디터 기본 내용
  useEffect(() => {
    const initialContent = `차량 연도: \n차량 상태: \n기타 정보: `;
    const contentState = ContentState.createFromText(initialContent);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  // editorState에 값 설정
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const handleSubmit = async () => {
    const carInfo = editorState.getCurrentContent().getPlainText(); // 에디터 내용 추출

    const token = useSelector((state: RootState) => state.user.userToken);

    const formData = new FormData();
    formData.append("title", "차량 제목");
    formData.append("car_info", carInfo);

    if (frontImage) formData.append("car_img[]", frontImage);
    if (sideImage1) formData.append("car_img[]", sideImage1);
    if (sideImage2) formData.append("car_img[]", sideImage2);

    try {
      const response = await axios.post(
        "http://localhost:3000/vehicles/addWrite",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("저장 성공", response.data);
      }
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  return (
    <>
      <WritePageStyled className={clsx("main-wrap")}>
        <div className="writeContent">
          <h1>Write</h1>

          {/* 제목 입력 */}
          <div className="writeInput">
            <label>제목</label>
            <Input type="text" placeholder="번호판을 입력하세요" />
          </div>

          {/* 이미지 업로드 */}
          <div className="writeImgInputs">
            <ImageUpload
              label="정면"
              image={frontImage}
              onChange={(e) => handleImageChange(e, setFrontImage)}
            />
            <ImageUpload
              label="측면 1"
              image={sideImage1}
              onChange={(e) => handleImageChange(e, setSideImage1)}
            />
            <ImageUpload
              label="측면 2"
              image={sideImage2}
              onChange={(e) => handleImageChange(e, setSideImage2)}
            />
          </div>

          {/* 에디터 */}
          <Editor
            className="editorBox"
            wrapperClassName="wrapper-class"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            // 툴바 설정
            toolbar={{
              // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
              options: ["inline", "textAlign", "history"],
              textAlign: { inDropdown: false },
              history: { inDropdown: false },
            }}
            placeholder="내용을 작성해주세요."
            localization={{
              locale: "ko",
            }}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />

          {/* 저장 버튼 */}
          <button
            className="saveBtn"
            onClick={handleSubmit}
            disabled={!frontImage || !sideImage1 || !sideImage2}
          >
            등록
          </button>
        </div>
      </WritePageStyled>
    </>
  );
};

// 이미지 업로드 & 미리보기 컴포넌트
const ImageUpload = ({
  label,
  image,
  onChange,
}: {
  label: string;
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="writePreInput">
      <label>{label}</label>
      <Input type="file" accept="image/*" onChange={onChange} />
      <div className="previewContainer">
        {image ? (
          <img src={image} alt={`${label} 미리보기`} className="previewImg" />
        ) : (
          <span className="previewText">이미지 선택</span>
        )}
      </div>
    </div>
  );
};

export default WriteContainer;
