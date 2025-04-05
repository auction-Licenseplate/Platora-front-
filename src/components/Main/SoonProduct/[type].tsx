import axios from "axios";
import { useEffect, useState } from "react";
import { SoonProductStyled } from "./styled";
import SoonProductCard from "./SoonProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

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
}

interface SoonProps {
  type?: number;
}

const SoonProduct = ({ type }: SoonProps) => {
  const [before, setBefore] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/boards/getAllProduct"
        );

        const data = response.data;
        const now = new Date().getTime();

        // 경매 데이터를 정렬하고 가까운 시간순으로 10개만 가져옴
        const formattedData = data
          .map((item: any, index: number) => {
            const endTimeMs = new Date(item.endTime).getTime();
            const timeDiff = endTimeMs - now;

            let timeLeft = "종료됨";
            if (timeDiff > 0) {
              const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
              );

              timeLeft = `${
                days > 0 ? `${days}일 ` : ""
              }${hours}시간 ${minutes}분`;
            }

            const imageUrls =
              item.imageUrl && typeof item.imageUrl === "string"
                ? item.imageUrl.split(",")
                : [];

            console.log(imageUrls[0]);

            return {
              id: index + 1,
              title: item.vehicleTitle,
              gradeName: parseInt(item.gradeName, 10),
              price: item.finalPrice,
              endTime: item.endTime,
              seller: item.userName,
              timeLeft,
              imageUrls,
              endTimeMs,
            };
          })
          .sort((a: any, b: any) => a.endTimeMs - b.endTimeMs)
          .slice(0, 10); // 가장 가까운 10개만 가져오기

        setBefore(formattedData);
      } catch (error) {
        console.error("경매 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchAuctions();
  }, []);

  // 필터링된 상품
  const filteredProducts = type
    ? before.filter((product) => product.gradeName === type)
    : [];

  return (
    <SoonProductStyled>
      {before.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
        >
          {before.map((product) => (
            <SwiperSlide key={product.id}>
              <SoonProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <></>
      )}

      {filteredProducts.length > 0 && (
        <>
          <Swiper
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1280: { slidesPerView: 5 },
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <SoonProductCard product={product} />
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
