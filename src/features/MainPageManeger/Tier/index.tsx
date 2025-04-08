import clsx from "clsx";
import { TierStyled } from "./styled";
import AllProduct from "../../../components/Main/AllProduct/[type]";
import SoonProduct from "@/components/Main/SoonProduct/[type]";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";

interface tierProps {
  type: number;
}

const Tier = ({ type }: tierProps) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

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
