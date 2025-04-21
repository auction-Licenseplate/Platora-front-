import axios from "axios";
import { useEffect, useState } from "react";
import { SoonProductStyled } from "./styled";
import SoonProductCard from "./SoonProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: number;
  title: string;
  gradeName: number;
  price: number;
  bids?: number;
  endTime: string;
  seller: string;
  timeLeft?: string;
  imageUrls: string[];
  status: string;
  minPrice?: number;
  startTime?: string;
  startTimeMs?: number;
  endTimeMs?: number;
}

interface SoonProps {
  type?: number;
}

const SoonProduct = ({ type }: SoonProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.post(
          "http://15.164.52.122/boards/getAllProduct"
        );

        const now = Date.now();

        const formattedData = response.data
          .filter((item: any) => item.startTime && item.endTime)
          .map((item: any) => {
            const startTimeMs = new Date(item.startTime).getTime();
            const endTimeMs = new Date(item.endTime).getTime();
            const imageUrls =
              typeof item.imageUrl === "string" ? item.imageUrl.split(",") : [];

            return {
              id: item.auctionID,
              title: item.vehicleTitle,
              gradeName: parseInt(item.gradeName, 10),
              price: item.finalPrice,
              endTime: item.endTime,
              seller: item.userName,
              imageUrls,
              startTime: item.startTime,
              status: item.status,
              minPrice: item.minPrice,
              startTimeMs,
              endTimeMs,
            };
          });

        setProducts(formattedData);
      } catch (error) {
        console.error("경매 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    const now = Date.now();
    let filtered: Product[] = [];

    if (type === 0) {
      // 곧 종료될 경매 (시작 시간 지났고 종료되지 않은 것)
      filtered = products
        .filter((p) => {
          const notEnded = p.endTimeMs && p.endTimeMs > now;
          return notEnded;
        })
        .sort((a, b) => a.endTimeMs! - b.endTimeMs!);
    } else if (type === undefined || type === null) {
      // 곧 시작될 경매 (시작 안 한 것)
      filtered = products
        .filter((p) => p.startTimeMs && p.startTimeMs > now)
        .sort((a, b) => a.startTimeMs! - b.startTimeMs!);
    } else {
      // 등급 필터
      filtered = products.filter((p) => p.gradeName === type);
    }

    // 남은 시간 텍스트 계산
    const timeLeft = filtered.map((p) => {
      const diff =
        type === 0 ? (p.endTimeMs ?? 0) - now : (p.startTimeMs ?? 0) - now;

      let timeLeft = "";
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        const parts: string[] = [];

        if (days > 0) parts.push(`${days}일`);
        if (hours > 0) parts.push(`${hours}시간`);
        if (minutes > 0) parts.push(`${minutes}분`);

        timeLeft = parts.join(" ") || "곧 종료";
      } else {
        timeLeft = "종료됨";
      }

      return { ...p, timeLeft };
    });

    setFilteredProducts(timeLeft);
  }, [products, type]);

  return (
    <SoonProductStyled>
      {filteredProducts.length > 0 && (
        <>
          <h1 className="mainFont">
            {type === 0 ? "Ending Soon Auctions" : "Upcoming Auctions"}
          </h1>

          <div className="swiper-button-prev">←</div>
          <div className="swiper-button-next">→</div>

          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 5 },
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <SoonProductCard
                  id={product.id}
                  product={product}
                  type={type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </SoonProductStyled>
  );
};

export default SoonProduct;
