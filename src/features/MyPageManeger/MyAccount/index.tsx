import clsx from "clsx";
import { useRouter } from "next/router";
import { MyAccountStyled } from "./styled";
import MyInfo from "@/components/MyInfo";
import MyPosts from "./MyPosts";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MenuProps {
  menu: string;
}

const MyAccount = ({ menu }: MenuProps) => {
  const token = useSelector((state: RootState) => state.user.userToken);

  if (!token) {
    return;
  }

  return (
    <MyAccountStyled className={clsx("main-wrap myAccountBack")}>
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
              <MyPosts type={"posts"} />
            </>
          ) : menu === "myFavorites" ? (
            <>
              <MyPosts type={"favorite"} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </MyAccountStyled>
  );
};

export default MyAccount;
