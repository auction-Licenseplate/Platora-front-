import clsx from "clsx";
import { useRouter } from "next/router";
import { StickyMenuStyled } from "./styled";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

import logoBlack from "@/assets/images/platoraLogo(black).png";
import logoWhite from "@/assets/images/platoraLogo(white).png";

interface MenuProps {
  menu: string;
}

const StickyMenu = ({ menu }: MenuProps) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 다크, 라이트 모드 -> 이미지 바뀌어야 함
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // 모드에 따라 이미지 변경
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const menuItems = [
    { label: "내 정보", value: "myInfo" },
    { label: "내 작성글 보기", value: "myPosts" },
    { label: "관심 상품 보기", value: "myFavorites" },
  ];

  // 회원 탈퇴 요청 -> 쿠키도 삭제
  const handleWithdraw = () => {
    Modal.confirm({
      centered: true,
      title: "탈퇴하시겠습니까?",
      content: "탈퇴하시면 모든 게시글, 포인트 및 회원 정보가 삭제됩니다.",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          await axios.delete("http://15.164.52.122/api/users/withdraw", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });

          router.push("/").then(() => window.location.reload());
        } catch (error) {
          console.error("회원 탈퇴 실패:", error);
          Modal.error({
            centered: true,
            title: "오류 발생",
            content: "회원 탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요.",
          });
        }
      },
    });
  };

  return (
    <StickyMenuStyled className={clsx("main-wrap")}>
      <div className="myPageSticky nomalFont">
        <div className="menus">
          {menuItems.map((item) => (
            <h1
              key={item.value}
              className={clsx("cursor", {
                active: item.value === menu,
              })}
              onClick={() => {
                router
                  .push(
                    {
                      pathname: router.pathname,
                      query: { menu: item.value },
                    },
                    undefined,
                    { shallow: true }
                  )
                  .then(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  });
              }}
            >
              {item.label}
            </h1>
          ))}
        </div>

        <div className="bottomMenu">
          <p onClick={handleWithdraw}> 회원탈퇴 </p>
          <Image
            className="logoImg"
            src={isDarkMode ? logoWhite : logoBlack}
            alt="platora logo"
          />
        </div>
      </div>
    </StickyMenuStyled>
  );
};

export default StickyMenu;
