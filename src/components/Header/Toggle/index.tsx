import Image from "next/image";

// 이미지
import logoBlack from "@/assets/images/platoraLogo(black).png";
import logoWhite from "@/assets/images/platoraLogo(white).png";

import closeIcon from "@/assets/images/closeIcon.png";
import closeIconBlack from "@/assets/images/closeIcon(black).png";
import { boolean } from "yup";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { setTheme, toggleTheme } from "@/store/themeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Modal } from "antd";
import axios from "axios";

const Toggle = ({
  isToggleOpen,
  handleToggleClick,
  token,
  toggleTierList,
  isTierOpen,
  handleClick,
  handleLogout,
  userRole,
}) => {
  const router = useRouter();

  const dispatch = useDispatch();

  // Redux에서 테마 모드 가져오기
  const mode = useSelector((state: RootState) => state.theme.mode);

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

  // 다크, 라이트 모드 선택 시
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // 다크, 라이트 모드
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  // 글 작성 버튼 클릭 시
  const handleWriteClick = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/admins/getStatus",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const ownershipStatus = response.data;

      if (ownershipStatus === "pending" || ownershipStatus === "waiting") {
        Modal.warning({
          centered: true,
          title: "공인 인증서 필요",
          content: "마이페이지에서 공인 인증서를 등록해주세요.",
          onOk: () =>
            router.push({
              pathname: "/myPage",
              query: { menu: "myInfo" },
            }),
        });
      } else {
        router.push("/write");
      }
    } catch (error) {
      console.error("Error fetching ownership status:", error);
    }
  };

  return (
    <>
      <div className={`toggleInfo ${isToggleOpen ? "open" : ""}`}>
        <div className="imageContainer">
          <div className="toggleLogoImg">
            <Image
              src={isDarkMode ? logoWhite : logoBlack}
              alt="platora logo image"
              layout="responsive"
              priority
            />
          </div>
          <Image
            src={isDarkMode ? closeIcon : closeIconBlack}
            alt="close icon"
            onClick={handleToggleClick}
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
        </div>

        <hr />

        <div className="categoryContainer">
          {!token ? (
            <>
              <div className="tier-container">
                <h3 onClick={toggleTierList} className="tier-title">
                  등급 별 게시글
                  {isTierOpen ? (
                    <UpOutlined className="tier-icon" />
                  ) : (
                    <DownOutlined className="tier-icon" />
                  )}
                </h3>
                <div className={`tier-list ${isTierOpen ? "open" : ""}`}>
                  {[...Array(10)].map((_, index) => (
                    <h3
                      key={index}
                      className="tier-item"
                      onClick={() => router.push("/login")}
                    >
                      Tier {index + 1}
                    </h3>
                  ))}
                </div>
              </div>

              <div className="toggleTexts">
                <h3 onClick={() => router.push("/login")}>로그인</h3>
                <h3 onClick={() => router.push("/join")}>회원가입</h3>
              </div>
            </>
          ) : userRole === null ? null : (
            <>
              <div className="tier-container">
                <h3 onClick={toggleTierList} className="tier-title">
                  등급 별 게시글
                  {isTierOpen ? (
                    <UpOutlined className="tier-icon" />
                  ) : (
                    <DownOutlined className="tier-icon" />
                  )}
                </h3>
                <div className={`tier-list ${isTierOpen ? "open" : ""}`}>
                  {[...Array(10)].map((_, index) => (
                    <h3
                      key={index}
                      className="tier-item"
                      onClick={() => handleClick(index + 1)}
                    >
                      Tier {index + 1}
                    </h3>
                  ))}
                </div>
              </div>
              {userRole === "" ? (
                <div className="toggleTexts">
                  <h3
                    onClick={() =>
                      router.push({
                        pathname: "/myPage",
                        query: { menu: "myInfo" },
                      })
                    }
                  >
                    내 계정
                  </h3>
                  <h3
                    onClick={() =>
                      router.push({
                        pathname: "/myPage",
                        query: { menu: "myPosts" },
                      })
                    }
                  >
                    내 작성글 보기
                  </h3>
                  <h3
                    onClick={() =>
                      router.push({
                        pathname: "/myPage",
                        query: { menu: "myFavorites" },
                      })
                    }
                  >
                    관심상품 보기
                  </h3>
                  <h3 onClick={handleWriteClick}>글 작성하기</h3>
                </div>
              ) : (
                <h3
                  onClick={() => window.open("http://localhost:4000", "_blank")}
                >
                  관리자 페이지로 이동
                </h3>
              )}
              <div className="toggleTexts">
                <h3 onClick={handleLogout}>로그아웃</h3>
              </div>
            </>
          )}

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
    </>
  );
};

export default Toggle;
