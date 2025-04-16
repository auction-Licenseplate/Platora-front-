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
}

interface SoonProps {
  type?: number;
}

const SoonProduct = ({ type }: SoonProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/boards/getAllProduct"
        );

        const now = new Date().getTime();

        // 경매 데이터를 정렬하고 가까운 시간순으로 10개만 가져옴
        const formattedData = response.data
          .filter((item: any) => item.status === "before")
          .map((item: any) => {
            const startTimeMs = item.startTime
              ? new Date(item.startTime).getTime()
              : 0;
            const endTimeMs = item.endTime
              ? new Date(item.endTime).getTime()
              : 0;

            const imageUrls =
              item.imageUrl && typeof item.imageUrl === "string"
                ? item.imageUrl.split(",")
                : [];

            // 남은 시간 계산
            const timeLeft = endTimeMs - now;
            let timeLeftString = "";

            if (timeLeft > 0) {
              const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
              );

              timeLeftString = `${days}일 ${hours}시간 ${minutes}분`;
            } else {
              timeLeftString = "종료됨";
            }

            return {
              id: item.auctionID,
              title: item.vehicleTitle,
              gradeName: parseInt(item.gradeName, 10),
              price: item.finalPrice,
              endTime: item.endTime,
              seller: item.userName,
              timeLeft: "", // 남은 시간 표시
              imageUrls,
              startTime: item.startTime,
              startTimeMs,
              status: item.status,
              minPrice: item.minPrice,
            };
          });

        setProducts(formattedData);
      } catch (error) {
        console.error("경매 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchAuctions();
  }, []);

  let filteredProducts: Product[] = [];

  if (type === undefined) {
    // 곧 시작하는 경매 (타입이 없을 때)
    const now = new Date().getTime();
    filteredProducts = [...products]
      .filter((item) => {
        // startTime이 정의되어 있는 경우만 비교하도록 처리
        return item.startTime && new Date(item.startTime).getTime() > now;
      })
      .sort(
        (a, b) =>
          new Date(a.startTime || 0).getTime() -
          new Date(b.startTime || 0).getTime()
      )
      .slice(0, 10);
  } else if (type === 0) {
    // 곧 종료하는 경매 (type === 0일 때)
    const now = new Date().getTime();
    filteredProducts = [...products]
      .filter((item) => new Date(item.endTime).getTime() > now) // 아직 안 끝난 애들
      .sort(
        (a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
      )
      .slice(0, 10);
  } else {
    // gradeName 필터 (type이 0이 아닐 때)
    filteredProducts = products.filter((product) => product.gradeName === type);
  }

  return (
    <SoonProductStyled>
      {filteredProducts.length > 0 && products.length > 0 ? (
        <h1 className="mainFont">
          {type === 0 ? "Ending Soon Auctions" : "Upcoming Auctions"}
        </h1>
      ) : (
        <></>
      )}

      {!type && products.length > 0 ? (
        <>
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
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <SoonProductCard id={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <></>
      )}

      {type && filteredProducts.length > 0 && (
        <>
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
            {filteredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <SoonProductCard id={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {type && filteredProducts.length === 0 && <></>}
    </SoonProductStyled>
  );
};

export default SoonProduct;
