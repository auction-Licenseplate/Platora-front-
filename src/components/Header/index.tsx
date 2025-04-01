import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HeaderStyled, Overlay } from "./styled";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTheme, toggleTheme } from "@/store/themeSlice";

// 로고 이미지
import logo from "@/assets/images/Logo_plotora(black).png";
import toggleLogo from "@/assets/images/Logo_plotora(white).png";
import userIcon from "@/assets/images/userIcon.png";
import closeIcon from "@/assets/images/closeIcon.png";
import favoriteIcon from "@/assets/images/favoriteIcon.png";
import logoutIcon from "@/assets/images/logoutIcon.png";
import axios from "axios";

const Header = () => {
  const router = useRouter();

  const token = useSelector((state: RootState) => state.user.userToken);

  // Redux에서 테마 모드 가져오기
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  // 토글 여닫기
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  // 다크, 라이트 모드
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 로그인 유무
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  // 토글 변경 시에
  useEffect(() => {
    const handleRouteChange = () => {
      setIsToggleOpen(false); // 페이지가 변경될 때마다 토글 닫기
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // 다크, 라이트 모드 redux에 저장
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        dispatch(setTheme(savedTheme as "light" | "dark"));
      }
    }
  }, [dispatch]);

  // 모드 변경 시 로컬 스토리지에 테마 저장
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", mode);
      if (mode === "light") {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
    }
  }, [mode]);

  // 토글 클릭 시
  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 다크, 라이트 모드 선택 시
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
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
            <label className="switch">
              <input
                type="checkbox"
                checked={mode === "dark"}
                onChange={handleThemeToggle}
              />
              <span className="slider">{mode === "dark" ? "☀️" : "🌙"}</span>
            </label>
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
            className={token ? "marginLogoImg" : "logoImg"}
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={logo} alt="platora logo image" layout="responsive" />
          </div>

          <div className="signUp">
            {isLoggedIn ? (
              <>
                <div className="userIcon">
                  <Image
                    src={userIcon}
                    alt="user icon"
                    layout="responsive"
                    onClick={() => {
                      router.push({
                        pathname: "/myPage",
                        query: { menu: "myInfo" },
                      });
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
                    onClick={handleLogout}
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
