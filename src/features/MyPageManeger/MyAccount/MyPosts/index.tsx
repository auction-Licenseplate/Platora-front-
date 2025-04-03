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

  // 게시글 요청 -> 해당 유저의 모든 정보 -> title, car_img, car_info, plate_num, write_status
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    const fetchPosts = async () => {
      try {
        if (type === "posts") {
          const pending = await axios.get(
            "http://localhost:5000/vehicles/getMyPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { write_status: "pending" },
            }
          );
          setPendingPosts(pending.data);

          const going = await axios.get(
            "http://localhost:5000/auctions/getPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { status: ["going", "before"] },
            }
          );
          setGoingPosts(going.data);
        } else if (type === "favorite") {
          // const favorite = await axios.get(
          //   "http://localhost:5000/favorites/getMyFavorites",
          //   {
          //     withCredentials: true,
          //     headers: { Authorization: `Bearer ${token}` },
          //   }
          // );
          // setFavoritePosts(favorite.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <MyPostsStyled className={clsx("main-wrap-myPosts")}>
      <div className="myPostContainer">
        <div className="postInfoBox">
          {type === "posts" ? (
            <MyPost type="posts" />
          ) : (
            <MyPost type="favorite" />
          )}
        </div>
      </div>
    </MyPostsStyled>
  );
};

export default MyPosts;
