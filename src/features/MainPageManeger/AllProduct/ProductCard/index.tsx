interface Product {
  id: number;
  title: string;
  gradeName: number;
  price: number;
  bids?: number;
  endTime: string;
  seller: string;
  timeLeft?: string;
  imageUrl: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {/* <img src={product.imageUrl} alt={product.title} /> */}
      </div>
      <div className="product-info">
        <p>제목: {product.title}</p>
        <p>등급: {product.gradeName}</p>
        <p>현재가: {product.price}</p>
        {product.bids !== undefined && <p>입찰 횟수: {product.bids}회</p>}
        <p>남은 시간: {product.timeLeft ?? "종료됨"}</p>
        <p>판매자: {product.seller}</p>
      </div>
    </div>
  );
};

export default ProductCard;
