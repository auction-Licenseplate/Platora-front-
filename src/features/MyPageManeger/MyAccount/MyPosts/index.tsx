import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostsStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MyPosts = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 게시글 데이터
  const [pendingPosts, setPendingPosts] = useState([]);
  const [goingPosts, serGoingPosts] = useState([]);

  // 게시글 요청 -> 해당 유저의 모든 정보 -> title, car_img, car_info, plate_num, write_status
  useEffect(() => {
    const getPost = async () => {
      try {
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
        serGoingPosts(going.data);
      } catch (e) {
        console.log(e);
      }
    };

    getPost();
  }, []);

  return (
    <MyPostsStyled className={clsx("main-wrap")}>
      <div className="myPostContainer">
        <div className="postInfoBox">
          {/* {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <img src={post.car_img} alt="Car" width="200" />
              <p>{post.car_info}</p>
              <p>번호판: {post.plate_num}</p>
              <p>작성자: {post.userId}</p>
            </div>
          ))} */}

          <div className="postsInfo">
            <div className="circle"></div>

            <div className="postImg"></div>

            <div className="line"></div>

            <div className="postTexts">
              <div className="postTitle"></div>
              <div className="postContents"></div>
            </div>

            <div className="circle"></div>
          </div>
        </div>
      </div>
    </MyPostsStyled>
  );
};

export default MyPosts;
