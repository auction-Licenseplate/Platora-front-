import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

interface postType {
  type: string;
  pendingPosts?: any[];
  goingPosts?: any[];
  favoritePosts?: any[];
}

const MyPost = ({
  type,
  pendingPosts = [],
  goingPosts = [],
  favoritePosts = [],
}: postType) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const renderPost = (post: any, key: number | string) => {
    console.log("렌더링되는 게시글:", post);
    console.log("carImage:", post.carImage);
    console.log(
      "전체 이미지 경로:",
      `http://localhost:5000/uploads/${post.carImage}`
    );

    return (
      <div key={key} className="postsInfo">
        <div className="circle"></div>

        <div className="postImg">
          <Image
            src={`http://localhost:5000/uploads/${post.carImage}`}
            alt="car image"
            width={400}
            height={300}
            unoptimized
          />
        </div>

        <div className="postLine"></div>

        <div className="postTexts">
          <div className="postTitle">
            {post.vehicleTitle} : {post.gradeName}
          </div>
          <div className="postContents">
            <div className="postText">현재가: {post.finalPrice}</div>
            <div className="postText">
              {post.endTime
                ? `남은 시간: ${new Date(post.endTime).toLocaleString()}`
                : "입찰 대기 중"}
            </div>
            <div className="postText">판매자: {post.userName}</div>
          </div>
        </div>

        <div className="circle"></div>
      </div>
    );
  };

  return (
    <MyPostStyled className={clsx("main-wrap-myPost")}>
      {/* 승인 전 */}

      {/* {pendingPosts.map((post, idx) => (
        <div key={idx}>
          <h3>{post.vehicleTitle}</h3>
          <img src={post.carImage} alt="car image" />
          <p>{post.carInfo}</p>
          <p>번호판: {post.vehicleTitle}</p>
          <p>작성자: {post.userName}</p>
        </div>
      ))} */}

      {/* 승인 후 */}

      {/* {goingPosts.map((post) => (
        <div key={post.auctionId}>
          <h3>{post.vehicleTitle}</h3>
          <img src={post.carImage} alt="car image" />
          <p>{post.carInfo}</p>
          <p>번호판: {post.vehicleTitle}</p>
          <p>작성자: {post.userName}</p>
        </div>
      ))}

      <div className="postsInfo">
        <div className="circle"></div>

        <div className="postImg"></div>

        <div className="postLine"></div>

        <div className="postTexts">
          <div className="postTitle">제목: 등급</div>
          <div className="postContents">
            <div className="postText">현재가</div>
            <div className="postText">입찰 횟수 | 남은 시간</div>
            <div className="postText">판매자</div>
          </div>
        </div>

        <div className="circle"></div>
      </div> */}

      {type === "posts" &&
        pendingPosts.map((post, idx) => renderPost(post, `pending-${idx}`))}

      {/* 승인 후 게시글 */}
      {type === "posts" &&
        goingPosts.map((post, idx) =>
          renderPost(
            {
              ...post,
              carImage: post.carImage ?? "", // 혹시 빠져있을 수 있는 이미지 처리
            },
            `going-${idx}`
          )
        )}

      {/* 즐겨찾기 게시글 */}
      {type === "favorite" &&
        favoritePosts.map((post, idx) => renderPost(post, `favorite-${idx}`))}
    </MyPostStyled>
  );
};

export default MyPost;
