import clsx from "clsx";
import { TierStyled } from "./styled";
import AllProduct from "../../../components/Main/AllProduct/[type]";
import SoonProduct from "@/components/Main/SoonProduct/[type]";

interface tierProps {
  type: number;
}

const Tier = ({ type }: tierProps) => {
  return (
    <TierStyled className={clsx("main-wrap-teir")}>
      {/* 곧 시작 경매 */}
      <SoonProduct type={type} />

      {/* 모든 경매 상품 */}
      <AllProduct type={type} />
    </TierStyled>
  );
};

export default Tier;
