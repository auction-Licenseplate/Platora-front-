import clsx from "clsx";
import { WritePageStyled } from "./styled";

const WriteContainer = () => {
  return (
    <>
      <WritePageStyled className={clsx("main-wrap")}>
        <div className="writeContent">
          <h1> write </h1>
        </div>
      </WritePageStyled>
    </>
  );
};

export default WriteContainer;
