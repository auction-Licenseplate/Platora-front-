import styled from "styled-components";

export const AllProductStyled = styled.div`
  &.main-wrap-products {
    width: 100%;
    max-width: 1280px;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .noAuctionImg {
      margin-top: 10px;
      width: 60%;
      height: 400px;
    }

    .product-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 250px);
      justify-content: center;
      gap: 20px;
      padding: 20px;
    }

    .product-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      cursor: pointer;
    }

    .product-image {
      position: relative;
      width: 100%;
      height: 150px;
      border-radius: 10px;
      overflow: hidden;
      background-color: transparent;

      .productImg {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        transition: transform 0.3s ease-in-out;
        filter: blur(5px);
      }

      .productImg.clear {
        filter: none;
      }
    }

    .product-card:hover .product-image .ant-image-img {
      transform: scale(1.1);
    }

    .product-info {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      text-align: center;

      hr {
        margin-top: 10px;
      }
    }

    .spanText {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: medium;
    }

    .prevIcon,
    .nextIcon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prevIcon {
      left: 8px;
    }

    .nextIcon {
      right: 8px;
    }

    p {
      margin: 4px 0;
      font-size: 14px;
    }

    @media (max-width: 1024px) {
      .product-container {
        grid-template-columns: repeat(3, 1fr);
      }

      .noAuctionImg {
        width: 80%;
        height: 400px;
      }
    }

    @media (max-width: 768px) {
      .product-container {
        grid-template-columns: repeat(2, 1fr);
      }

      .noAuctionImg {
        width: 90%;
        height: 350px;
      }
    }

    @media (max-width: 480px) {
      .product-container {
        grid-template-columns: repeat(1, 1fr);
      }

      .noAuctionImg {
        width: 100%;
        height: 250px;
      }

      .productImg {
        width: 140% !important;
      }
    }
  }
`;
