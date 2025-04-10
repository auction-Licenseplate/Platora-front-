import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Tooltip } from "antd";

interface postType {
  type: string;
  pendingPosts?: any[];
  goingPosts?: any[];
  favoritePosts?: any[];
  isWide?: boolean;
}

const MyPost = ({
  type,
  pendingPosts = [],
  goingPosts = [],
  favoritePosts = [],
  isWide = false,
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

    let timeLeft = "종료됨";
    if (post.endTime) {
      const now = new Date().getTime();
      const endTimeMs = new Date(post.endTime).getTime();
      const timeDiff = endTimeMs - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        timeLeft = `${days > 0 ? `${days}일 ` : ""}${hours}시간 ${minutes}분`;
      }
    }

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
            router.push(`/detail/${post.auctionId || post.auctionID}`);
          }}
        >
          <div className="badgeTitle">
            <span>{post.vehicleTitle}</span>

            <Tooltip
              title={
                <div style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                  {`${
                    post.gradeName
                  }등급\n최저가 ${post.minPrice?.toLocaleString()}원`}
                </div>
              }
            >
              <Image
                className="badgeIcon"
                src={`/badge/badgeIcon${post.gradeName}.png`}
                alt={post.gradeName}
                width={17}
                height={17}
              />
            </Tooltip>
          </div>
          <div className="postContents">
            <div className="postText">
              {`현재가: ${post.finalPrice.toLocaleString()}원${
                isPending ? " (예상 금액)" : ""
              }`}
            </div>

            <div className="postText">
              {post.endTime ? `남은 시간: ${timeLeft}` : "입찰 대기 중"}
            </div>
            <div className="postText">판매자: {post.userName}</div>
          </div>
        </div>

        <div className="circle"></div>
      </div>
    );
  };

  return (
    <MyPostStyled className={clsx("main-wrap-myPost")} isWide={isWide}>
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
