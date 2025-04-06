import { useState } from "react";
import { Image } from "antd";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
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
}

const ProductCard = ({ product }: Props) => {
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
  const originalUrl = `http://localhost:5000/uploads/${product.imageUrls[currentImageIndex]}`;

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
              <button onClick={handlePrevImage} className="prevIcon">
                <FiChevronLeft size={20} />
              </button>
            )}
            {/* 다음 버튼 */}
            {product.imageUrls.length > 1 && (
              <button onClick={handleNextImage} className="nextIcon">
                <FiChevronRight size={20} />
              </button>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="product-info">
        <span className="spanText">
          {product.title} <span>{product.gradeName}등급</span>
        </span>
        <hr />
        <p>현재가: {product.price}</p>
        {product.bids !== undefined && <p>입찰 횟수: {product.bids}회</p>}
        <p>남은 시간: {product.timeLeft ?? "종료됨"}</p>
        <p>판매자: {product.seller}</p>
      </div>
    </div>
  );
};

export default ProductCard;
