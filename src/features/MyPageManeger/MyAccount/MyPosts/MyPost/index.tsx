import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface postType {
  type: string;
}

const MyPost = ({ type }: postType) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  return (
    <MyPostStyled className={clsx("main-wrap-myPost")}>
      {/* 승인 전 */}

      {/* {pendingPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <img src={post.car_img} alt="Car" width="200" />
          <p>{post.car_info}</p>
          <p>번호판: {post.plate_num}</p>
          <p>작성자: {post.userId}</p>
        </div>
      ))} */}

      {/* 승인 후 */}

      {/* {goingPosts.map((post) => (
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
      </div>
    </MyPostStyled>
  );
};

export default MyPost;
