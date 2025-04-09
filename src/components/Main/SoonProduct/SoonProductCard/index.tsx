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
        <h3>{product.title}</h3>
        <p className="price">현재가 : {product.price.toLocaleString()} 원</p>
        <p className="time-left">{product.timeLeft}</p>
      </div>
    </div>
  );
};

export default SoonProductCard;
