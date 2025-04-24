import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostsStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MyPost from "./MyPost";

interface Props {
  type: string;
}

const MyPosts = ({ type }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 내 게시글 데이터
  const [pendingPosts, setPendingPosts] = useState([]);
  const [goingPosts, setGoingPosts] = useState([]);

  // 즐겨찾기
  const [favoritePosts, setFavoritePosts] = useState([]);

  // 게시글 요청 -> 해당 유저의 모든 정보
  useEffect(() => {
    if (token === "" || !token) return;

    const fetchPosts = async () => {
      try {
        if (type === "posts") {
          // 승인 전 vehicles 테이블
          const waiting = await axios.get(
            "http://15.164.52.122/boards/getMyPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { write_status: "waiting" },
            }
          );

          setPendingPosts(waiting.data);

          // 승인 후 boards 테이블
          const going = await axios.get(
            "http://15.164.52.122/boards/getPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { status: ["going", "before"] },
            }
          );

          setGoingPosts(going.data);
        } else if (type === "favorite") {
          // 해당 유저의 관심 상품
          const favorite = await axios.get(
            "http://15.164.52.122/boards/getMyFavorites",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log("좋아요 정보들 : ", favorite.data);
          setFavoritePosts(favorite.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, [type]);

  return (
    <MyPostsStyled className={clsx("main-wrap-myPosts")}>
      <div className="myPostContainer">
        <div className="postInfoBox">
          {type === "posts" ? (
            <MyPost
              type="posts"
              pendingPosts={pendingPosts}
              goingPosts={goingPosts}
            />
          ) : (
            <MyPost type="favorite" favoritePosts={favoritePosts} />
          )}
        </div>
      </div>
    </MyPostsStyled>
  );
};

export default MyPosts;
