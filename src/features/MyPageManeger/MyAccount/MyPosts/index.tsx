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
          // 승인 전 vehicles 테이블 -> title, car_img, car_info, grades 테이블의 grade_name
          const waiting = await axios.get(
            "http://localhost:5000/boards/getMyPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { write_status: "waiting" },
            }
          );

          console.log(waiting.data);
          setPendingPosts(waiting.data);

          // 승인 후 boards 테이블 -> 경매 번호(auctions 테이블), 판매자명(users.id), 제목(vehicles.id), 등급(grades.id), final_price, end_time, status
          const going = await axios.get(
            "http://localhost:5000/boards/getPosts",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
              params: { status: ["going", "before"] },
            }
          );

          setGoingPosts(going.data);
        } else if (type === "favorite") {
          // 해당 유저의 관심 상품 -> 판매자명(users.id), 제목(vehicles.id), 등급(grades.id), final_price, end_time, status
          const favorite = await axios.get(
            "http://localhost:5000/boards/getMyFavorites",
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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
