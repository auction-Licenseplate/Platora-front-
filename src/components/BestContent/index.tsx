import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { BestContentStyled } from "./styled";
import Image from "next/image";

// 이미지
import carImg1 from "@/assets/images/carImage1.jpeg";

interface ContentItem {
  id: number;
  image: string;
  title: string;
}

const BestContent = () => {
  const [bestContents, setBestContents] = useState<ContentItem[]>([]);

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

  return (
    <>
      <BestContentStyled className={clsx("main-wrap")}>
        {/* {bestContents.map((content) => (
          <div key={content.id} className="content-item">
            <img
              src={content.image}
              alt={content.title}
              className="content-image"
            />
            <h3 className="content-title">{content.title}</h3>
          </div>
        ))} */}
        <div className="content-item">
          <Image src={carImg1} alt="platora image" width={200} />
          <h3 className="content-title"></h3>
        </div>
      </BestContentStyled>
    </>
  );
};

export default BestContent;
