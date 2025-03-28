import clsx from "clsx";
import { useRouter } from "next/router";
import { MyAccountStyled } from "./styled";
import MyInfo from "@/features/MyPageManeger/MyInfo";

const Main = () => {
  const router = useRouter();

  return (
    <MyAccountStyled className={clsx("main-wrap")}>
      <div className="main-container">
        <div className="myInfoContainer">
          <MyInfo info={"myInfo"} />
          <MyInfo info={"point"} />
        </div>
      </div>
    </MyAccountStyled>
  );
};

export default Main;
