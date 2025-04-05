import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  grade_name: number;
  price: number;
  bids: number;
  end_time: string;
  seller: string;
}

const SoonProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAuctions = async (type: string) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/boards/getRecentProduct/${type}`
        );
        const data = await response.data;

        const now = new Date().getTime();

        const formattedData = data.map((item: any) => {
          const endTime = new Date(item.end_time).getTime();
          const timeDiff = endTime - now;

          let timeLeft = "종료됨";
          if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            timeLeft = `${hours}시간 ${minutes}분`;
          }

          return {
            id: item.id,
            title: item.title,
            price: `${item.price.toLocaleString()}원`,
            timeLeft,
            seller: item.seller,
          };
        });

        setProducts(formattedData);
      } catch (error) {
        console.error("경매 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchAuctions("allRecent");
  }, []);

  return <></>;
};

export default SoonProduct;
