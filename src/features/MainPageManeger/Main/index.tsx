import clsx from "clsx";
import { useRouter } from "next/router";
import { MainStyled } from "./styled";
import Advertising from "../Advertising";
import BestProduct from "../BestProduct";

const Main = () => {
  const router = useRouter();
  // const id:number = 2 변수 선언 예시
  return (
    <MainStyled className={clsx("main-wrap")}>
      {/* 광고 */}
      <Advertising />

      {/* 인기있는 상품 */}
      <BestProduct />
    </MainStyled>
  );
};

export default Main;
