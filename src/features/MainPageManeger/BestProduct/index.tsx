import clsx from "clsx";
import { BestProductStyled } from "./styled";
import BestContent from "@/components/BestContent";

const BestProduct = () => {
  return (
    <>
      <BestProductStyled className={clsx("main-wrap")}>
        <div className="bestProductContent">
          <BestContent />
        </div>
      </BestProductStyled>
    </>
  );
};

export default BestProduct;
