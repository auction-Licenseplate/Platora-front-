import clsx from "clsx";
import { useRouter } from "next/router";
import { MainStyled } from "./styled";
import Advertising from "../Advertising";
import BestProduct from "../BestProduct";
import { Button } from "antd";

const Main = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/write");
  };

  return (
    <MainStyled className={clsx("main-wrap")}>
      {/* 광고 */}
      <Advertising />

      {/* 관리자 홍보 */}
      <BestProduct />

      {/* 곧 시작 경매 */}

      {/* 글 작성하기 */}
      <Button onClick={handleClick}> 글 작성하기 </Button>

      {/* 전체 경매 */}
    </MainStyled>
  );
};

export default Main;
