import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPageStyled } from "./styled";
import StickyMenu from "@/components/StickyMenu";
import MyAccount from "@/features/MyPageManeger/MyAccount";

const Main = () => {
  const router = useRouter();

  return (
    <MyPageStyled className={clsx("main-wrap")}>
      <div className="mainContainer">
        <div className="leftContainer">
          <StickyMenu pageInfo={"myPage"} />
        </div>
        <div className="mainContent">
          <MyAccount />
        </div>
      </div>
    </MyPageStyled>
  );
};

export default Main;
