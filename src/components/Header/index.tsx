import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { HeaderStyled, Overlay } from "./styled";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@/store/userSlice";
import { RootState } from "@/store/store";
import { setTheme, toggleTheme } from "@/store/themeSlice";
import Toggle from "./Toggle";

// 로고 이미지
import logoBlack from "@/assets/images/platoraLogo(black).png";
import logoWhite from "@/assets/images/platoraLogo(white).png";

import userIconBlack from "@/assets/images/userIcon(black).png";
import userIconWhite from "@/assets/images/userIcon(white).png";
import favoriteIconBlack from "@/assets/images/favoriteIcon(black).png";
import favoriteIconWhite from "@/assets/images/favoriteIcon(white).png";
import logoutIconBlack from "@/assets/images/logoutIcon(black).png";
import logoutIconWhite from "@/assets/images/logoutIcon(white).png";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 토글 여닫기
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  // 타입 별 게시글 토글
  const [isTierOpen, setIsTierOpen] = useState(false);

  // 다크, 라이트 모드
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  // 토글 변경 시에
  useEffect(() => {
    let isMounted = true;

    const handleRouteChange = () => {
      if (isMounted) {
        setIsToggleOpen(false); // 페이지가 변경될 때마다 토글 닫기
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      isMounted = false;
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // 토글 클릭 시
  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 등급 별 게시글 토글 열고 닫기
  const toggleTierList = () => {
    setIsTierOpen((prev) => !prev);
  };

  // 타입 변경
  const handleClick = (selectedType: number) => {
    router.push({
      pathname: "/",
      query: { type: selectedType },
    });
  };

  // 로그아웃
  const handleLogout = async () => {
    const token = document.cookie;
    const accessToken = token
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch(setUserToken(""));
    router.push("/");
  };

  // 해당 페이지에서 스타일 변경
  const isOnlyLogo = /^\/(login|join|find\/(id|pw))/.test(router.asPath);

  return (
    <>
      {isToggleOpen && <Overlay onClick={handleToggleClick} />}

      <HeaderStyled className={clsx("main-wrap")}>
        <Toggle
          isToggleOpen={isToggleOpen}
          handleToggleClick={handleToggleClick}
          token={token}
          toggleTierList={toggleTierList}
          isTierOpen={isTierOpen}
          handleClick={handleClick}
          handleLogout={handleLogout}
        />

        <div className="main-container">
          {!isOnlyLogo && (
            <div className="toggleBtn" onClick={handleToggleClick}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}

          <div
            className={clsx(token ? "marginLogoImg" : "logoImg", {
              centerLogo: isOnlyLogo,
            })}
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src={isDarkMode ? logoWhite : logoBlack}
              alt="platora logo image"
              layout="responsive"
            />
          </div>

          {!isOnlyLogo && (
            <div className="signUp">
              {token ? (
                <>
                  <div className="userIcon">
                    <Image
                      src={isDarkMode ? userIconWhite : userIconBlack}
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
                      src={isDarkMode ? favoriteIconWhite : favoriteIconBlack}
                      alt="favorite icon"
                      layout="responsive"
                      onClick={() => {
                        router.push({
                          pathname: "/myPage",
                          query: { menu: "myFavorites" },
                        });
                      }}
                    />
                  </div>
                  <div className="userIcon">
                    <Image
                      src={isDarkMode ? logoutIconWhite : logoutIconBlack}
                      alt="logout icon"
                      layout="responsive"
                      onClick={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <div className="userIcon">
                  <Image
                    src={isDarkMode ? userIconWhite : userIconBlack}
                    alt="user icon"
                    layout="responsive"
                    onClick={() => {
                      router.push("/login");
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
