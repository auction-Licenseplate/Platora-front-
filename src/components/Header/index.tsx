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
import alertIconBlack from "@/assets/images/alertIcon(black).png";
import alertIconWhite from "@/assets/images/alertIcon(white).png";
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

  // 알람 상태
  const [notifications, setNotifications] = useState<
    { id: number; message: string; createdAt: string }[]
  >([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  // 유저, 관리자 구분
  const [userRole, setUserRole] = useState<string | null>(null);

  // 알림을 클릭했을 때 처리
  const handleNotificationClick = (id: number) => {
    if (!readNotifications.includes(id)) {
      const updated = [...readNotifications, id];
      setReadNotifications(updated); // 읽은 알림 상태 업데이트
      localStorage.setItem("readNotifications", JSON.stringify(updated));

      // 모든 알림을 읽었으면 새 알림이 없다고 설정
      const unreadNotifications = notifications.filter(
        (noti) => !updated.includes(noti.id)
      );
      setHasNewNotification(unreadNotifications.length > 0);
      localStorage.setItem(
        "hasNewNotification",
        JSON.stringify(unreadNotifications.length > 0)
      );
    }
  };

  // 알림을 열 때 처리
  const toggleAlert = () => {
    const willOpen = !isAlertOpen;
    setIsAlertOpen(willOpen);

    // 알림을 열면 새 알림 표시 상태를 false로 설정
    if (willOpen) {
      setHasNewNotification(false);
      localStorage.setItem("hasNewNotification", JSON.stringify(false));
    }
  };

  // 알림 데이터
  useEffect(() => {
    const dummy = [
      {
        id: 1,
        message: "새 공지가 등록되었습니다",
        createdAt: "2025-04-15T09:00:00Z",
      },
      {
        id: 2,
        message: "댓글이 달렸습니다",
        createdAt: "2025-04-15T10:00:00Z",
      },
    ];

    // 알림 목록 상태 업데이트
    setNotifications(dummy);

    // 읽은 알림 목록 처리
    const savedReadNotifications = localStorage.getItem("readNotifications");
    if (savedReadNotifications) {
      setReadNotifications(JSON.parse(savedReadNotifications));
    }

    // 새 알림 여부 판단 (읽지 않은 알림이 있는지 확인)
    const unreadNotifications = dummy.filter(
      (noti) => !readNotifications.includes(noti.id)
    );

    // 새 알림이 있을 때만 상태를 업데이트
    setHasNewNotification(unreadNotifications.length > 0);
    localStorage.setItem(
      "hasNewNotification",
      JSON.stringify(unreadNotifications.length > 0)
    );
  }, []);

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

  // 유저, 관리자 구분
  useEffect(() => {
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/getRole", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const role = res.data;
        setUserRole(role);
      } catch (error) {
        console.error("유저 정보 요청 실패:", error);
      }
    };

    fetchUserInfo();
  }, [token]);

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
          userRole={userRole}
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
                        {
                          userRole === "admin"
                            ? window.open("http://localhost:4000", "_blank")
                            : router.push({
                                pathname: "/myPage",
                                query: { menu: "myInfo" },
                              });
                        }
                      }}
                    />
                  </div>

                  {userRole === "" ? (
                    <div
                      className="userIcon alertIcon"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={isDarkMode ? alertIconWhite : alertIconBlack}
                        alt="alert icon"
                        layout="responsive"
                        onClick={toggleAlert}
                      />
                      {hasNewNotification && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "0px",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: "red",
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

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

        {isAlertOpen && (
          <div
            style={{
              position: "absolute",
              top: "-5px",
              right: "20px",
              background: "#fff",
              borderRadius: "5px",
              padding: "10px",
              width: "200px",
              zIndex: 9999,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {notifications.length === 0 ? (
              <p style={{ fontSize: "14px" }}>알림이 없습니다</p>
            ) : (
              notifications.map((noti) => (
                <p
                  key={noti.id}
                  style={{
                    fontSize: "14px",
                    margin: "4px 0",
                    color: readNotifications.includes(noti.id)
                      ? "gray"
                      : "black",
                  }}
                  onClick={() => handleNotificationClick(noti.id)}
                >
                  {noti.message}
                </p>
              ))
            )}
          </div>
        )}
      </HeaderStyled>
    </>
  );
};

export default Header;
