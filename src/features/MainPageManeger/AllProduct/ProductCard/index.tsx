interface Product {
  id: number;
  title: string;
  price: string;
  bids: number;
  timeLeft: string;
  seller: string;
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
        <p>현재가: {product.price}</p>
        <p>
          입찰 횟수 | 남은 시간: {product.bids}회 | {product.timeLeft}
        </p>
        <p>판매자: {product.seller}</p>
      </div>
    </div>
  );
};

export default ProductCard;
