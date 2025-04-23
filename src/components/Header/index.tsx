import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { HeaderStyled, Overlay } from "./styled";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@/store/userSlice";
import { RootState } from "@/store/store";
import Toggle from "./Toggle";
import api from "@/util/intercept";

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
  const [alertData, setAlertData] = useState<
    {
      id: number;
      message: string;
      createdAt: string;
      check: boolean;
      vehicleTitle: string;
      vehicleId: number;
      created_at: string;
    }[]
  >([]);
  const [newAlert, setNewAlert] = useState(false);

  // 유저, 관리자 구분
  const [userRole, setUserRole] = useState<string | null>(null);

  // 알람 상태 변경
  useEffect(() => {
    const hasUnread = alertData.some((noti) => !noti.check);
    setNewAlert(hasUnread);
  }, [alertData]);

  // 다크, 라이트 모드
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  // 유저, 관리자 구분 & 알람 데이터
  useEffect(() => {
    if (!token) return;

    // 유저, 관리자 구분
    const fetchUserInfo = async () => {
      try {
        const res = await api.get("http://15.164.52.122/auth/getRole", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRole(res.data);
      } catch (error) {
        console.error("유저 정보 요청 실패:", error);
      }
    };

    // 알림 데이터
    const fetchalertData = async () => {
      try {
        const res = await axios.get(
          "http://15.164.52.122/notification/getAlert",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAlertData(res.data);
      } catch (error) {
        console.error("알림 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
    fetchalertData();
  }, [token]);

  // 알림을 한 번에 띄우기 (혹은 알림이 있을 때마다)
  useEffect(() => {
    alertData.forEach((noti) => {
      if (!noti.check) {
        showNotification(noti); // 안 읽은 알림을 띄우기
      }
    });
  }, [alertData]);

  // 토글 변경 시에
  useEffect(() => {
    let isMounted = true;

    const handleRouteChange = () => {
      // 페이지가 변경될 때마다 토글 닫기
      if (isMounted) {
        setIsToggleOpen(false);
      }
    };

    // 라이팅 시 생성
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      isMounted = false;
      // 라우팅 종료 시 제거
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // 알림 클릭 처리
  const readAlert = async (id: number) => {
    try {
      // patch: 일부 데이터 변경
      await axios.patch(
        `http://15.164.52.122/notification/${id}`,
        { check: true },

        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAlertData((prev) =>
        prev.map((noti) => (noti.id === id ? { ...noti, check: true } : noti))
      );
    } catch (err) {
      console.error("알림 상태 변경 실패:", err);
    }
  };

  const showNotification = (noti: {
    id: number;
    message: string;
    check: boolean;
    vehicleTitle: string;
    vehicleId: number;
    created_at: string;
  }) => {
    // 중복 방지 -> 삭제 시 한 번 더 호출해서
    const notificationKey = String(noti.id);

    const type =
      noti.message === "refund"
        ? "warning"
        : noti.message === "bid"
        ? "info"
        : "success";

    const parsedDate = new Date(noti.created_at);

    const hour = parsedDate.getHours().toString().padStart(2, "0");
    const minute = parsedDate.getMinutes().toString().padStart(2, "0");

    const formatted = `${parsedDate.getFullYear()}년 ${
      parsedDate.getMonth() + 1
    }월 ${parsedDate.getDate()}일 ${hour}시 ${minute}분`;

    notification[type]({
      key: notificationKey,
      message:
        type === "warning"
          ? "포인트 반환"
          : type === "info"
          ? "입찰 완료"
          : "입찰 성공",
      duration: 5,
      description: (
        <div>
          <div>
            {noti.message === "refund"
              ? `[${noti.vehicleTitle}] 해당 입찰 건이 더 높은 금액에 입찰되어 자동으로 포인트가 반환되었습니다.`
              : noti.message === "bid"
              ? `[${noti.vehicleTitle}] 해당 차량에 입찰이 완료되었습니다.`
              : `[${noti.vehicleTitle}] 차량의 최종 입찰자로 선정되었습니다.`}
          </div>
          <div className="modalFoot">{`${formatted}`}</div>
        </div>
      ),
      onClick: () => {
        readAlert(noti.id), notification.close(notificationKey);
        router.push(`/detail/${noti.vehicleId}`);
      },
      closeIcon: (
        <span
          onClick={() => {
            readAlert(noti.id);
            notification.close(notificationKey);
          }}
          className="closeIcon"
        >
          &times;
        </span>
      ),
    });
  };

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
    console.log("logout console");
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
          userRole={userRole}
          toggleTierList={toggleTierList}
          isTierOpen={isTierOpen}
          handleClick={handleClick}
          handleLogout={handleLogout}
        />

        <div className="main-container">
          <div className="toggleBtn" onClick={handleToggleClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>

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
                            ? window.open("http://52.62.79.236", "_blank")
                            : router.push({
                                pathname: "/myPage",
                                query: { menu: "myInfo" },
                              });
                        }
                      }}
                    />
                  </div>

                  {userRole !== "admin" ? (
                    <div className="userIcon alertIcon">
                      <Image
                        src={isDarkMode ? alertIconWhite : alertIconBlack}
                        alt="alert icon"
                        layout="responsive"
                        onClick={() => {
                          alertData.forEach((noti) => {
                            if (!noti.check) {
                              showNotification(noti);
                            }
                          });
                        }}
                      />
                      {newAlert && <span className="alertCircle" />}
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
      </HeaderStyled>
    </>
  );
};

export default Header;
