import { useEffect, useState, useRef } from "react";

const ImageUpload = ({ label, name, setFieldValue, image }: any) => {
  const [localFile, setLocalFile] = useState<File | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (localFile) {
      Promise.resolve().then(() => {
        if (isMounted) {
          setFieldValue(name, localFile);
        }
      });
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    // 차량 사진 input
    <div className="writePreInput">
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
      />
      <div
        className="previewContainer"
        onClick={() => fileInputRef.current?.click()}
      >
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

export default ImageUpload;
