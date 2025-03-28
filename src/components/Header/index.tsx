import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import Image from "next/image";

// 로고 이미지
import logo from "@/assets/images/Logo_plotora(black).png";
import toggleLogo from "@/assets/images/Logo_plotora(white).png";
import userIcon from "@/assets/images/userIcon.png";
import closeIcon from "@/assets/images/closeIcon.png";

const Main = () => {
  const router = useRouter();

  // 토글 열기
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <HeaderStyled className={clsx("main-wrap")}>
      <div
        className="toggleInfo"
        style={{ display: isToggleOpen ? "block" : "none" }}
      >
        <div className="imageContainer">
          <Image
            src={toggleLogo}
            alt="platora logo image"
            width={200}
            height={40}
          />
          <Image
            src={closeIcon}
            alt="close icon"
            onClick={handleToggleClick}
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="categoryContainer"></div>
      </div>

      {/* 네비게이션 바 */}
      <div className="main-container">
        <div className="toggleBtn" onClick={handleToggleClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div
          className="logoImg"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src={logo} alt="platora logo image" width={280} height={50} />
        </div>

        {/* 로그인 상태 유무 체크 */}
        <div
          className="signUp"
          onClick={() => {
            router.push("/join");
          }}
        >
          <Image src={userIcon} alt="user icon" width={50} height={35} />
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Main;
