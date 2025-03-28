import clsx from "clsx";
import { useRouter } from "next/router";
import { StickyMenuStyled } from "./styled";

interface MenuProps {
  pageInfo: string;
}

const StickyMenu = ({ pageInfo }: MenuProps) => {
  const router = useRouter();

  return (
    <StickyMenuStyled className={clsx("main-wrap")}>
      <div className="main-container">
        {pageInfo === "myPage" ? (
          <>
            <h1> 마이페이지 </h1> <h1> 내 정보 </h1>
          </>
        ) : (
          <h1> 승인 요청 </h1>
        )}
      </div>
    </StickyMenuStyled>
  );
};

export default StickyMenu;
