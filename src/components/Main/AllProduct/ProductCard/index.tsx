import { useState } from "react";
import { Image, Tooltip } from "antd";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import timeIcon from "@/assets/images/alarmIcon.png";

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
}

const ProductCard = ({ product, id }: Props) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  // 화살표 눌렀을 때 썸네일 변경
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1
    );
  };

  // 토큰 유무에 따라 썸네일 달라짐
  const originalUrl = `http://15.164.52.122/uploads/${product.imageUrls[currentImageIndex]}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={originalUrl}
          alt={product.title}
          preview={token ? true : false}
          className={`productImg ${token ? "clear" : ""}`}
        />

        {token ? (
          <>
            {/* 이전 버튼 */}
            {product.imageUrls.length > 1 && (
              <div onClick={handlePrevImage} className="prevIcon">
                <FiChevronLeft size={20} />
              </div>
            )}
            {/* 다음 버튼 */}
            {product.imageUrls.length > 1 && (
              <div onClick={handleNextImage} className="nextIcon">
                <FiChevronRight size={20} />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        className="product-info"
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
          <span className="price">{product.price.toLocaleString()}</span>
          <span>
            원 {product.timeLeft === "종료됨" ? "(최종가)" : "(현재가)"}
          </span>
        </span>
        {product.bids !== undefined && <p>입찰 횟수: {product.bids}회</p>}
        <p className="time-left">
          <img src={timeIcon.src} alt="time icon" />
          {product.timeLeft === "종료됨" ? "" : "종료까지  "}
          {product.timeLeft ?? "종료됨"}
        </p>
        <p className="seller">판매자: {product.seller}</p>
      </div>
    </div>
  );
};

export default ProductCard;
