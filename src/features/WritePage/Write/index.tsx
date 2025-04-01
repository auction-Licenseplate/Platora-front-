import { useEffect, useState } from "react";
import clsx from "clsx";
import { WritePageStyled } from "./styled";
import { Input } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, ContentState } from "draft-js";

// 서버 사이드 렌더링을 하지 않도록 설정 -> 클라이언트 측에서만 로드
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
) as any;

const WriteContainer = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [sideImage1, setSideImage1] = useState<string | null>(null);
  const [sideImage2, setSideImage2] = useState<string | null>(null);

  // preview
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

  // 에디터 내용 저장
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const initialContent = `차량 연도: \n차량 상태: \n기타 정보: `;
    const contentState = ContentState.createFromText(initialContent);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  // editorState에 값 설정
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
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
            onClick={() => console.log("발행")}
            disabled={!frontImage || !sideImage1 || !sideImage2}
          >
            발행
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
