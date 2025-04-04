import { useRouter } from "next/router";
import { AllProductStyled } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

// interface Product {
//   id: number;
//   title: string;
//   price: string;
//   end_time: string;
//   seller: string;
// }

const dummyData = [
  {
    id: 1,
    title: "등급 A",
    price: "100,000원",
    bids: 3,
    timeLeft: "2시간",
    seller: "판매자1",
  },
  {
    id: 2,
    title: "등급 B",
    price: "200,000원",
    bids: 5,
    timeLeft: "1시간",
    seller: "판매자2",
  },
  {
    id: 3,
    title: "등급 C",
    price: "150,000원",
    bids: 2,
    timeLeft: "3시간",
    seller: "판매자3",
  },
  {
    id: 4,
    title: "등급 D",
    price: "250,000원",
    bids: 4,
    timeLeft: "30분",
    seller: "판매자4",
  },
];

const AllProduct = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);
  // const [products, setProducts] = useState<Product[]>([]);

  // 필요한 정보 : 판매자명(users.id), 제목(vehicles.id), 등급(grades.id), final_price, end_time, status
  // useEffect(() => {
  //   const fetchAuctions = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/auctions/getAllProduct"
  //       );
  //       const data = await response.data;

  //       const now = new Date().getTime();

  //       const formattedData = data.map((item: any) => {
  //         const endTime = new Date(item.end_time).getTime();
  //         const timeDiff = endTime - now;

  //         let timeLeft = "종료됨";
  //         if (timeDiff > 0) {
  //           const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //           const minutes = Math.floor(
  //             (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  //           );
  //           timeLeft = `${hours}시간 ${minutes}분`;
  //         }

  //         return {
  //           id: item.id,
  //           title: item.title,
  //           price: `${item.price.toLocaleString()}원`,
  //           timeLeft,
  //           seller: item.seller,
  //         };
  //       });

  //       setProducts(formattedData);
  //     } catch (error) {
  //       console.error("경매 데이터를 불러오는 중 오류 발생", error);
  //     }
  //   };

  //   fetchAuctions();
  // }, []);

  return (
    <AllProductStyled className={clsx("main-wrap-products")}>
      <div className="product-container">
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        {dummyData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </AllProductStyled>
  );
};

export default AllProduct;
