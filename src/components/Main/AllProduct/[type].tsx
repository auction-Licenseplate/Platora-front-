import { useRouter } from "next/router";
import { AllProductStyled } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

// 이미지
import noProduct from "@/assets/images/NoAuction(whiteFont).png";
import noProductBlack from "@/assets/images/NoAuction(blackFont).png";

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
  minPrice?: number;
}

interface TeirProps {
  type?: number;
}

const AllProduct = ({ type }: TeirProps) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // 다크, 라이트 모드 -> 이미지 바뀌어야 함
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.post(
          "http://15.164.52.122/boards/getAllProduct"
        );

        const data = response.data;

        // 현재 시간을 KST로 변환 (9시간 더함)
        const now = new Date().getTime();

        const formattedData = data.map((item: any, index: number) => {
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

          return {
            id: item.auctionID,
            title: item.vehicleTitle,
            gradeName: parseInt(item.gradeName, 10),
            price: item.finalPrice,
            endTime: item.endTime,
            seller: item.userName,
            timeLeft,
            imageUrls,
            minPrice: item.minPrice,
          };
        });

        const sortedData = formattedData.sort(
          (a: Product, b: Product) => b.id - a.id
        );

        setProducts(sortedData);
      } catch (error) {
        console.error("경매 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    if (type) {
      const result = products.filter((product) => product.gradeName === type);
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [products, type]);

  // 모드에 따라 이미지 변경 시 필요
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <AllProductStyled className={clsx("main-wrap-products")}>
      {filteredProducts.length > 0 && products.length > 0 ? (
        <h1 className="mainFont allAcution">All Auctions</h1>
      ) : (
        <></>
      )}

      {products.length === 0 || filteredProducts.length === 0 ? (
        <Image
          className="noAuctionImg"
          key={isDarkMode ? "dark" : "light"}
          src={isDarkMode ? noProduct : noProductBlack}
          alt="No Auction"
        />
      ) : (
        <div className="product-container">
          {!type
            ? products.map((product, index) => (
                <ProductCard id={product.id} key={index} product={product} />
              ))
            : filteredProducts.map((product, index) => (
                <ProductCard id={product.id} key={index} product={product} />
              ))}
        </div>
      )}
    </AllProductStyled>
  );
};

export default AllProduct;
