import { useState } from "react";
import { Image } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

interface Props {
  product: Product;
  id: number;
}

const SoonProductCard = ({ product, id }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  return (
    <div className="soon-card">
      <div className="soon-image">
        <Image
          src={`http://localhost:5000/uploads/${product.imageUrls[0]}`}
          alt={product.title}
          preview={token ? true : false}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            filter: token ? "none" : "blur(5px)",
          }}
        />
      </div>
      <div
        className="soon-info"
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <p className="badgeTitle">
          {product.title}

          <Image
            className="badgeIcon"
            src={`/badge/badgeIcon${product.gradeName}.png`}
            preview={false}
          />
        </p>
        <span className="priceFont">
          <span className="price">{product.price.toLocaleString()}</span> 원
          (현재가)
        </span>
        <p className="time-left">시작까지 {product.timeLeft}</p>
        <p className="seller"> 판매자 : {product.seller}</p>
      </div>
    </div>
  );
};

export default SoonProductCard;
