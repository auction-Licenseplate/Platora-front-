import clsx from "clsx";
import { useRouter } from "next/router";
import { TierStyled } from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface tierProps {
  type: number;
}

interface Auction {
  id: number;
  title: string;
  grade_name: string;
  current_price: number;
  end_time: string;
  bid_count: number;
  seller: string;
  status: "befro" | "going" | "completed";
}

const Tier = ({ type }: tierProps) => {
  // 게시글 정보 담기
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const getGradeName = (type: number): string => {
    return `${type}등급`;
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  // 등급에 따른 게시글 요청 -> grades 테이블의 grade_name에 따라 게시글 요청
  // grade_name의 id를 가진 auctions의 auction_num, 판매자명, 차량 번호판, 등급, 현재가, end_time, status
  // bid_count

  // useEffect(() => {
  //   const fetchAuctions = async () => {
  //     const grade = getGradeName(type);

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/grades?grade=${grade}`
  //       );

  //       const statusOrder = { befro: 0, going: 1, completed: 2 };
  //       const sortedAuctions = response.data.sort(
  //         (a: Auction, b: Auction) =>
  //           statusOrder[a.status] - statusOrder[b.status]
  //       );

  //       setAuctions(sortedAuctions);
  //     } catch (error) {
  //       console.error("경매 데이터를 불러오는 중 오류 발생:", error);
  //     }
  //   };

  //   fetchAuctions();
  // }, [type]);

  // 남은 시간 계산
  const formatTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "경매 종료";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}시간 ${minutes}분 남음`;
  };

  return (
    <TierStyled className={clsx("main-wrap")}>
      {/* {auctions.length === 0 ? (
        <p>현재 진행 중인 경매가 없습니다.</p>
      ) : (
        <div className="teir-container">
          {auctions.map((auction) => (
            <div key={auction.id}>
              <h3>{auction.title}</h3>
              <p>등급: {auction.grade_name}</p>
              <p>현재가: {auction.current_price.toLocaleString()} 원</p>
              <p>남은 시간: {formatTimeRemaining(auction.end_time)}</p>
              <p>입찰 횟수: {auction.bid_count}회</p>
              <p>판매자: {auction.seller}</p>
              <p>상태: {auction.status}</p>
            </div>
          ))}
        </div>
      )} */}

      <div> {type} </div>
    </TierStyled>
  );
};

export default Tier;
