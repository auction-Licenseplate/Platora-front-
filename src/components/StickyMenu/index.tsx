import clsx from "clsx";
import { useRouter } from "next/router";
import { StickyMenuStyled } from "./styled";

interface MenuProps {
  pageInfo: string;
  menu: string;
}

const StickyMenu = ({ pageInfo, menu }: MenuProps) => {
  const router = useRouter();

  const menuItems = [
    { label: "내 정보", value: "myInfo" },
    { label: "내 작성글 보기", value: "myPosts" },
    { label: "관심 상품 보기", value: "myFavorites" },
    { label: "회원 탈퇴", value: "withdraw" },
  ];

  return (
    <StickyMenuStyled className={clsx("main-wrap")}>
      <div className="myPageSticky GlitchFont">
        {pageInfo === "myPage" ? (
          <>
            <h1 className="title"> 마이페이지 </h1>
            {menuItems.map((item) => (
              <h1
                key={item.value}
                className={clsx("cursor", {
                  active: item.value === menu,
                })}
              >
                {item.label}
              </h1>
            ))}
          </>
        ) : (
          <h1> 승인 요청 </h1>
        )}
      </div>
    </StickyMenuStyled>
  );
};

export default StickyMenu;
