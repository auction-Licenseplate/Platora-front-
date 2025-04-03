import clsx from "clsx";
import { useRouter } from "next/router";
import { MainStyled } from "./styled";
import BestProduct from "../BestProduct";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Main = ({ type }: { type: number }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const handleClick = () => {
    // if(!token || )
    router.push("/write");
  };

  return (
    <MainStyled className={clsx("main-wrap")}>
      {type ? (
        // <Tier type={type} />
        <div></div>
      ) : (
        <>
          {/* 관리자 홍보 */}
          <BestProduct />

          {/* 곧 시작 경매 */}

          {/* 글 작성하기 */}
          <Button onClick={handleClick}> 글 작성하기 </Button>

          {/* 전체 경매 */}
        </>
      )}
    </MainStyled>
  );
};

export default Main;
