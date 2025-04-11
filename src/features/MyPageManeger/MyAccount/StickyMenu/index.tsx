import clsx from "clsx";
import { useRouter } from "next/router";
import { StickyMenuStyled } from "./styled";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "antd";

interface MenuProps {
  menu: string;
}

const StickyMenu = ({ menu }: MenuProps) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const menuItems = [
    { label: "내 정보", value: "myInfo" },
    { label: "내 작성글 보기", value: "myPosts" },
    { label: "관심 상품 보기", value: "myFavorites" },
    { label: "회원 탈퇴", value: "withdraw" },
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
          await axios.delete("http://localhost:5000/users/withdraw", {
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
      <div className="myPageSticky GlitchFont">
        <>
          <h1 className="title"> MYPAGE </h1>
          {menuItems.map((item) => (
            <h1
              key={item.value}
              className={clsx("cursor", {
                active: item.value === menu,
              })}
              onClick={() => {
                if (item.value === "withdraw") {
                  handleWithdraw();
                } else {
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
                }
              }}
            >
              {item.label}
            </h1>
          ))}
        </>
      </div>
    </StickyMenuStyled>
  );
};

export default StickyMenu;
