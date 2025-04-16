import styled from "styled-components";

export const AllProductStyled = styled.div`
  &.main-wrap-products {
    width: 100%;
    max-width: 1280px;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .allAcution {
      margin: 30px 0;
    }

    .noAuctionImg {
      margin-bottom: 30px;
      width: 60%;
      height: 400px;
    }

    .product-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 277px);
      justify-content: center;
      gap: 20px;
      padding: 20px;
    }

    .product-card {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      cursor: pointer;
      background-color: #ffffff;
    }

    .product-image {
      position: relative;
      width: 100%;
      height: 150px;
      border-radius: 5px 5px 0 0;
      overflow: hidden;
      background-color: transparent;

      .ant-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .productImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 5px 5px 0 0;
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

    .badgeTitle {
      display: flex;
      align-items: center;
      gap: 7px;

      .badgeIcon {
        width: 18px;
        height: 18px;
      }
    }

    .product-info {
      width: 100%;
      padding: 20px 20px 15px 20px;
      border-radius: 0 0 5px 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .priceFont {
        font-size: 14px;
        margin-top: 5px;

        .price {
          font-size: 20px;
          color: #333;
          font-weight: 600;
          margin: 0 5px 5px 0;
        }
      }
    }

    .time-left {
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 12px;
      color: #777;

      img {
        width: 15px;
      }
    }

    .seller {
      font-size: 12px;
      color: #777;
      margin-top: -5px;
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

    @media (max-width: 1200px) {
      & {
        padding: 0px;
      }

      .product-container {
        grid-template-columns: repeat(3, 1fr);
      }

      .noAuctionImg {
        width: 80%;
        min-height: 400px;
      }
    }

    @media (max-width: 768px) {
      .product-container {
        grid-template-columns: repeat(2, 1fr);
      }

      .noAuctionImg {
        width: 90%;
        min-height: 350px;
      }
    }

    @media (max-width: 550px) {
      .product-container {
        grid-template-columns: repeat(1, 1fr);
      }

      .noAuctionImg {
        width: 80%;
        min-height: 200px;
        max-height: 200px;
      }
    }
  }
`;
