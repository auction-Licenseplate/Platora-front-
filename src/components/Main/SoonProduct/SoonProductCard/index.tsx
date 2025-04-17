import { useState } from "react";
import { Image, Tooltip } from "antd";
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
  minPrice?: number;
}

interface Props {
  product: Product;
  id: number;
  type?: number;
}

const SoonProductCard = ({ product, id, type }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  return (
    <div className="soon-card">
      <div className="soon-image">
        <Image
          src={`http://localhost:5000/uploads/${product.imageUrls[0]}`}
          alt={product.title}
          preview={token ? true : false}
          className={`soonImg ${token ? "clear" : ""}`}
        />
      </div>
      <div
        className="soon-info"
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <div className="badgeTitle">
          <span>{product.title}</span>

          <Tooltip
            title={
              <div style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                {`${
                  product.gradeName
                }등급\n최저가 ${product.minPrice?.toLocaleString()}원`}
              </div>
            }
          >
            <Image
              className="badgeIcon"
              src={`/badge/badgeIcon${product.gradeName}.png`}
              preview={false}
            />
          </Tooltip>
        </div>
        <span className="priceFont">
          <span className="price">{product.price.toLocaleString()}</span> 원
          (현재가)
        </span>
        <p className="time-left">
          {type === 0 ? "종료까지 " : "시작까지 "} {product.timeLeft}
        </p>
        <p className="seller"> 판매자 : {product.seller}</p>
      </div>
    </div>
  );
};

export default SoonProductCard;
