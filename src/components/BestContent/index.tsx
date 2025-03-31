import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { BestContentStyled } from "./styled";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 이미지
import carImg1 from "@/assets/images/carImage1.jpeg";
import carImg2 from "@/assets/images/carImage2.png";
import carImg3 from "@/assets/images/carImage3.jpeg";

interface ContentItem {
  id: number;
  image: string;
  title: string;
}

const BestContent = () => {
  // const [bestContents, setBestContents] = useState<ContentItem[]>([]);

  useEffect(() => {
    // const fetchBestContents = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/best-contents?limit=3"
    //     );
    //     setBestContents(response.data);
    //   } catch (error) {
    //     console.error("데이터 가져오기 실패:", error);
    //   }
    // };
    // fetchBestContents();
  }, []);

  const bestContents = [
    { id: 1, image: carImg1, title: "ㅇㅇㅇㅇㅇ" },
    { id: 2, image: carImg2, title: "ㅇㅇㅇㅇㅇ" },
    { id: 3, image: carImg3, title: "ㅇㅇㅇㅇㅇ" },
  ];

  return (
    <>
      <BestContentStyled className={clsx("main-wrap")}>
        <Swiper spaceBetween={50} slidesPerView={3}>
          {bestContents.map((content) => (
            <SwiperSlide key={content.id}>
              <Image src={content.image} alt={content.title} width={700} />
              <h3 className="content-title">{content.title}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </BestContentStyled>
    </>
  );
};

export default BestContent;
