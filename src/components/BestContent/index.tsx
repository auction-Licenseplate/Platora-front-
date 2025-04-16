import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { BestContentStyled } from "./styled";
import Image from "next/image";
import { Carousel } from "antd";
import "swiper/css";

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
            </div>
          </div>
        ))}
      </Carousel>
    </BestContentStyled>
  );
};

export default BestContent;
