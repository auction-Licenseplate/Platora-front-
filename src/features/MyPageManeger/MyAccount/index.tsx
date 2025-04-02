import clsx from "clsx";
import { useRouter } from "next/router";
import { MyAccountStyled } from "./styled";
import MyInfo from "@/components/MyInfo";
import MyPosts from "./MyPosts";

interface MenuProps {
  menu: string;
}

const MyAccount = ({ menu }: MenuProps) => {
  const router = useRouter();

  return (
    <MyAccountStyled className={clsx("main-wrap")}>
      <div className="main-container">
        <div className="myInfoContainer">
          {menu === "myInfo" ? (
            <>
              <MyInfo info={"myInfo"} />
              <MyInfo info={"point"} />
              <MyInfo info={"changePass"} />
              <MyInfo info={"vehicle"} />
            </>
          ) : menu === "myPosts" ? (
            <>
              <MyPosts />
            </>
          ) : menu === "myFavorites" ? (
            <></>
          ) : (
            <></>
          )}
        </div>
      </div>
    </MyAccountStyled>
  );
};

export default MyAccount;
