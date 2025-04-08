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

  const renderPost = (
    post: any,
    key: number | string,
    isPending: boolean = false
  ) => {
    const carImages = post.carImage?.split(",") || [];
    const firstImage = carImages[0]?.trim();

    return (
      <div key={key} className="postsInfo">
        <div className="circle"></div>

        <div className="postImg">
          <Image
            src={`http://localhost:5000/uploads/${firstImage}`}
            alt="car image"
            fill
            unoptimized
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        </div>

        <div className="postLine"></div>

        <div
          className="postTexts"
          onClick={() => {
            router.push(`/detail/${post.auctionId || post.vehicleId}`);
          }}
        >
          <div className="postTitle">
            {post.vehicleTitle} : {post.gradeName}
          </div>
          <div className="postContents">
            <div className="postText">
              {`현재가: ${post.finalPrice.toLocaleString()}원${
                isPending ? " (예상 금액)" : ""
              }`}
            </div>

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
      {type === "posts" &&
        pendingPosts.map((post, idx) =>
          renderPost(post, `pending-${idx}`, true)
        )}

      {/* 승인 후 */}
      {type === "posts" &&
        goingPosts.map((post, idx) =>
          renderPost({ ...post }, `going-${idx}`, false)
        )}

      {/* 즐겨찾기 */}
      {type === "favorite" &&
        favoritePosts.map((post, idx) =>
          renderPost({ ...post }, `favorite-${idx}`, false)
        )}
    </MyPostStyled>
  );
};

export default MyPost;
