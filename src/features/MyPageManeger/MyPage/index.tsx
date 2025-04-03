import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPageStyled } from "./styled";
import StickyMenu from "@/features/MyPageManeger/MyAccount/StickyMenu";
import MyAccount from "@/features/MyPageManeger/MyAccount";

const MyPage = () => {
  const router = useRouter();
  const { menu } = router.query;

  const menuValue: string = Array.isArray(menu) ? menu[0] : menu ?? "default";

  return (
    <MyPageStyled className={clsx("main-wrap")}>
      <div className="mainContainer">
        <div className="leftContainer">
          <StickyMenu menu={menuValue} />
          <div className="line"></div>
        </div>
        <div className="mainContent">
          <MyAccount menu={menuValue} />
        </div>
      </div>
    </MyPageStyled>
  );
};

export default MyPage;
