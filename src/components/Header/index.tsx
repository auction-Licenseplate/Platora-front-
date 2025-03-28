import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/router";
import { HeaderStyled, Overlay } from "./styled";
import Image from "next/image";

// 로고 이미지
import logo from "@/assets/images/Logo_plotora(black).png";
import toggleLogo from "@/assets/images/Logo_plotora(white).png";
import userIcon from "@/assets/images/userIcon.png";
import closeIcon from "@/assets/images/closeIcon.png";

const Main = () => {
  const router = useRouter();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      {isToggleOpen && <Overlay onClick={handleToggleClick} />}

      <HeaderStyled className={clsx("main-wrap")}>
        <div className={`toggleInfo ${isToggleOpen ? "open" : ""}`}>
          <div className="imageContainer">
            <div className="toggleLogoImg">
              <Image
                src={toggleLogo}
                alt="platora logo image"
                layout="responsive"
              />
            </div>
            <Image
              src={closeIcon}
              alt="close icon"
              onClick={handleToggleClick}
              width={40}
              height={40}
              style={{ cursor: "pointer" }}
            />
          </div>

          <hr />

          <div className="categoryContainer">
            <h2> Grade 1</h2>
          </div>
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
            <Image src={logo} alt="platora logo image" layout="responsive" />
          </div>

          <div
            className="signUp"
            onClick={() => {
              router.push("/login");
            }}
          >
            <div className="userIcon">
              <Image src={userIcon} alt="user icon" layout="responsive" />
            </div>
          </div>
        </div>
      </HeaderStyled>
    </>
  );
};

export default Main;
