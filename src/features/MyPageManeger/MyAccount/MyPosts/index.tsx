import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostsStyled } from "./styled";

const MyPosts = () => {
  const router = useRouter();

  return (
    <MyPostsStyled className={clsx("main-wrap")}>
      <div className="myPostContainer">
        <div className="postInfoBox"></div>
      </div>
    </MyPostsStyled>
  );
};

export default MyPosts;
