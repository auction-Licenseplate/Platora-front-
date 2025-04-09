import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { BestContentStyled } from "./styled";
import Image from "next/image";
import { Carousel } from "antd";
import "swiper/css";

// 이미지
import carImg1 from "@/assets/images/carImage1.jpg";
import carImg2 from "@/assets/images/carImage2.png";
import carImg3 from "@/assets/images/carImage3.jpeg";

interface ContentItem {
  id: number;
  image: string;
  title: string;
}

const BestContent = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admins/contents?limit=3"
        );
        const formatted = response.data.map((item: any, idx: number) => ({
          id: idx,
          image: `http://localhost:5000/uploads/${item.banner_img}`,
          title: `배너 이미지 ${idx + 1}`,
        }));
        setContents(formatted);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchContents();
  }, []);

  const fetchContents = [
    { id: 1, image: carImg1, title: "Car Image 1" },
    { id: 2, image: carImg2, title: "Car Image 2" },
    { id: 3, image: carImg3, title: "Car Image 3" },
  ];

  return (
    <BestContentStyled className={clsx("main-wrap-best")}>
      <Carousel autoplay autoplaySpeed={3000}>
        {contents.map((content) => (
          <div key={content.id} className="carousel-item">
            <div className="image-container">
              <Image
                src={content.image}
                alt={content.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="title-overlay">
                <h3 className="content-title">{content.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </BestContentStyled>
  );
};

export default BestContent;
