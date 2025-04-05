import { useRouter } from "next/router";
import { AllProductStyled } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

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

const AllProduct = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const { type } = router.query;
  const selectedType = typeof type === "string" ? parseInt(type, 10) : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/boards/getAllProduct"
        );
        const data = response.data;

        const now = new Date().getTime();

        const formattedData = data.map((item: any, index: number) => {
          const endTimeMs = new Date(item.endTime).getTime();
          const timeDiff = endTimeMs - now;

          let timeLeft = "종료됨";
          if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            timeLeft = `${hours}시간 ${minutes}분`;
          }

          const imageUrls =
            item.imageUrl && typeof item.imageUrl === "string"
              ? item.imageUrl.split(",")
              : [];

          console.log(imageUrls);

          return {
            id: index + 1, // 또는 item.id가 있다면 사용
            title: item.vehicleTitle,
            gradeName: parseInt(item.gradeName, 10),
            price: item.finalPrice,
            endTime: item.endTime,
            seller: item.userName,
            timeLeft,
            imageUrls,
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
    if (selectedType) {
      const result = products.filter(
        (product) => product.gradeName === selectedType
      );
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedType]);

  return (
    <AllProductStyled className={clsx("main-wrap-products")}>
      <div className="product-container">
        {!type
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </AllProductStyled>
  );
};

export default AllProduct;
