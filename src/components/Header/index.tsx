import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HeaderStyled, Overlay } from "./styled";
import Image from "next/image";
import { cookies } from "next/headers";

// 로고 이미지
import logo from "@/assets/images/Logo_plotora(black).png";
import toggleLogo from "@/assets/images/Logo_plotora(white).png";
import userIcon from "@/assets/images/userIcon.png";
import closeIcon from "@/assets/images/closeIcon.png";
import favoriteIcon from "@/assets/images/favoriteIcon.png";
import logoutIcon from "@/assets/images/logoutIcon.png";
import Cookie from "js-cookie";

const Header = () => {
  const router = useRouter();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  // const token = cookies(null).access_token;

  // const token = req.cookies['access_token'];

  // console.log("dd", document.cookie);

  useEffect(() => {
    // 클라이언트에서 쿠키 읽기
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("access_token=")
    );

    console.log(document.cookie);

    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];
      setToken(tokenValue);
      console.log(tokenValue);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsToggleOpen(false); // 페이지가 변경될 때마다 토글 닫기
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

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
                priority
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

            <h2
              onClick={() => {
                router.push("/join");
              }}
            >
              join
            </h2>
            <h2
              onClick={() => {
                router.push("/login");
              }}
            >
              login
            </h2>
            <h2
              onClick={() => {
                router.push({
                  pathname: "/myPage",
                  query: { menu: "myInfo" },
                });
              }}
            >
              mypage
            </h2>
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

          <div className="signUp">
            {token ? (
              <>
                <div className="userIcon">
                  <Image
                    src={userIcon}
                    alt="user icon"
                    layout="responsive"
                    onClick={() => {
                      router.push("/login");
                    }}
                  />
                </div>
                <div className="userIcon">
                  <Image
                    src={favoriteIcon}
                    alt="favorite icon"
                    layout="responsive"
                  />
                </div>
                <div className="userIcon">
                  <Image
                    src={logoutIcon}
                    alt="logout icon"
                    layout="responsive"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="userIcon">
                  <Image
                    src={userIcon}
                    alt="user icon"
                    layout="responsive"
                    onClick={() => {
                      router.push("/login");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
