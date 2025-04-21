import clsx from "clsx";
import { useRouter } from "next/router";
import { MyPostStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Modal, Tooltip } from "antd";

// 이미지
import fullheart from "@/assets/images/fullheart.png";
import heart from "@/assets/images/heart.png";
import noPostBlack from "@/assets/images/noPostBlack.png";
import noPostWhite from "@/assets/images/noPostWhite.png";

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

  // 게시글별 좋아요 상태
  const [likedMap, setLikedMap] = useState<{ [key: string]: boolean }>({});

  // 다크, 라이트 모드
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // 모드에 따라 이미지 변경
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (type === "favorite") {
      const initLiked: { [key: string]: boolean } = {};
      favoritePosts.forEach((post) => {
        const key = post.auctionId || post.auctionID || post.vehicleTitle;
        initLiked[key] = true; // 좋아요 상태
      });
      setLikedMap(initLiked);
    }
  }, [type, favoritePosts]);

  // 남은 시간 계산
  const renderPost = (
    post: any,
    key: number | string,
    isPending: boolean = false //승인 전
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

    // 삭제 요청 -> auctionId 가 없어서 vehicleTitle (번호판)으로 보냄
    const handleDeletePost = async (postId: string) => {
      try {
        const response = await axios.delete(
          `http://15.164.52.122/api/boards/deletePosts/${postId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Modal.error({
          centered: true,
          title: "게시글이 삭제되었습니다.",
          onOk: () => router.reload(),
        });
      } catch (error) {
        Modal.error({ centered: true, title: "삭제에 실패했습니다." });
      }
    };

    // 좋아요 토글 함수
    const toggleLikePost = async (post: any) => {
      const key = post.auctionId || post.auctionID;

      try {
        const res = await axios.post(
          "http://15.164.52.122/api/boards/likepost",
          {
            id: post.auctionID || post.auctionId,
            userId: post.userId,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLikedMap((prev) => ({
          ...prev,
          [key]: res.data.status,
        }));

        if (type === "favorite" && res.data.status === false) {
          Modal.info({
            centered: true,
            title: "즐겨찾기에서 제거되었습니다.",
            onOk: () => router.reload(),
          });
        }
      } catch (error) {
        Modal.error({ centered: true, title: "좋아요 처리에 실패했습니다." });
      }
    };

    const keyId = post.auctionId || post.auctionID;

    return (
      <div key={key} className="postsInfo">
        <div className="circle"></div>

        <div className="postImg">
          <Image
            src={`http://15.164.52.122/api/uploads/${firstImage}`}
            alt="car image"
            fill
            unoptimized
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        </div>

        <div className="postLine"></div>

        <div
          className={`postTexts ${post.endTime ? "cursorPointer" : ""}`}
          onClick={
            post.endTime
              ? () => {
                  router.push(`/detail/${post.auctionId || post.auctionID}`);
                }
              : undefined
          }
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

            {type === "favorite" && (
              <Image
                className="favoriteImg"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikePost(post);
                }}
                src={likedMap[keyId] ? fullheart : heart}
                alt="like icon"
              />
            )}
          </div>
          <div className="postContents">
            <div className="postTexts">
              <div className="postText">
                {timeLeft === "종료됨" && post.endTime
                  ? `최종가: ${post.finalPrice.toLocaleString()}원`
                  : `현재가: ${post.finalPrice.toLocaleString()}원${
                      isPending ? " (예상 금액)" : ""
                    }`}
              </div>

              <div className="postText">
                {post.endTime ? `남은 시간: ${timeLeft}` : "입찰 대기 중"}
              </div>
              <div className="postText">판매자: {post.userName}</div>
            </div>

            {/* 승인 전 게시글은 삭제 요청 가능 */}
            {isPending && (
              <button
                className="deleteBtn"
                onClick={(e) => {
                  e.stopPropagation(); // 부모 div 클릭 이벤트 방지
                  handleDeletePost(post.vehicleTitle);
                }}
              >
                삭제 요청
              </button>
            )}
          </div>
        </div>

        <div className="circle"></div>
      </div>
    );
  };

  return (
    <MyPostStyled className={clsx("main-wrap-myPost")} isWide={isWide}>
      {favoritePosts.length === 0 &&
        pendingPosts.length === 0 &&
        goingPosts.length === 0 && (
          <div className="empty-wrap">
            <Image
              className="emptyImg"
              src={isDarkMode ? noPostWhite : noPostBlack}
              alt="noPost"
            />
          </div>
        )}

      {/* 승인 전 */}
      {type === "posts" &&
        pendingPosts.map((post, idx) =>
          renderPost(post, `pending-${idx}`, true)
        )}

      {/* 승인 후 */}
      {type === "posts" &&
        goingPosts
          .slice()
          .sort((a, b) => {
            const now = new Date().getTime();
            const aEnd = new Date(a.endTime).getTime();
            const bEnd = new Date(b.endTime).getTime();

            const aDiff = aEnd - now;
            const bDiff = bEnd - now;

            const aIsEnded = aDiff <= 0;
            const bIsEnded = bDiff <= 0;

            if (aIsEnded && !bIsEnded) return 1;
            if (!aIsEnded && bIsEnded) return -1;

            return aEnd - bEnd;
          })
          .map((post, idx) => renderPost({ ...post }, `going-${idx}`, false))}

      {type === "favorite" &&
        favoritePosts.map((post, idx) =>
          renderPost({ ...post }, `favorite-${idx}`, false)
        )}
    </MyPostStyled>
  );
};

export default MyPost;
