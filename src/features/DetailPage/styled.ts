import styled from "styled-components";

export const DetailStyled = styled.div`
  &.detailstyled {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: white;

    .detail-wrap {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 10px 10px 10px;
    }

    .detail-title {
      padding-top: 50px;
      font-size: 2vw;
      font-weight: 500;
      margin-left: 20px;
      color: black;
    }

    .auctionAlert {
      font-size: 12px;
      margin-top: 10px;
    }

    .detail-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      flex-direction: row;
    }

    .detail-imgcontainer {
      width: 50%;
      margin-top: 20px;
    }

    .detail-imgcontainer,
    .detail-textcontainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .detail-textcontainer {
      width: 45%;
      margin-left: 20px;
      align-items: flex-start;
    }

    .detail-priceBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .detail-bidPriceBox {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .detail-price {
      width: 100%;
      font-size: 1.3vw;
      font-weight: 500;
      padding-left: 30px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10%;
      text-align: center;
      color: black;
    }
    .detail-mainimg {
      width: 100% !important;
      height: 400px !important;
    }
    .detail-clickimg {
      width: 30% !important;
      height: 30% !important;
    }
    .detail-bigprice {
      font-size: 2vw;
    }

    .detail-textdiv {
      width: 50%;
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      gap: 5%;
      text-align: start;
      .detail-seller {
        cursor: pointer;
      }
    }

    .detail-texttitle {
      width: 40%;
      color: #777;
      font-size: 1vw;
    }

    .detail-minibox {
      width: 90%;
      border: 1px solid #fafafa;
      background-color: #fafafa;
      padding: 20px;
      border-radius: 10px;
    }

    .detail-thicktext {
      width: 50%;
      font-weight: 600;
      font-size: 1vw;
      white-space: nowrap; /* 줄바꿈 방지 */
    }
    .detial-nowrap {
      width: 100%;
      white-space: nowrap; /* 줄바꿈 방지 */
      display: flex;
      justify-content: center;
      gap: 3px;
    }
    .detail-pricetotal {
      font-size: 12px;
      margin-top: -10px;
      color: #777;
    }

    .detail-btndiv {
      width: 100%;
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
      margin-top: 20px;

      Button {
        width: 50% !important;
        border-radius: 5px;
        box-shadow: 1px 1px 5px rgb(204, 204, 204) !important;
      }
    }

    .detail-heart {
      width: 25px;
      height: 25px;
      margin-left: 150px;
      cursor: pointer;
    }

    .detail-numbtn {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .detail-currentprice {
      display: flex;
      align-items: center;
    }
    .detail-detailboxwrap {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 50px;
    }
    .detail-detailBox {
      background-color: #fafafa;
      width: 80%;
      border: 1px solid lightgray;
      margin-top: 50px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .detial-detailImg {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }
    .detail-carinfo {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .detail-detailinfoImg {
      width: 100% !important;
    }
    // 미디어 쿼리 - 모바일
    @media (max-width: 1000px) {
      .detail-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .detail-thicktext {
        font-size: 12px;
      }
      .detail-imgcontainer,
      .detail-textcontainer,
      .detail-detailBox,
      .detail-textdiv {
        width: 100%;
      }

      .detail-price {
        width: 90%;
      }

      .detail-textcontainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .detail-title {
        font-size: 30px;
        text-align: center;
      }

      .detail-priceText {
        font-size: 18px;
        margin-top: 10px;
        white-space: nowrap;

        @media (max-width: 600px) {
          & {
            font-size: 15px;
          }
        }

        @media (max-width: 450px) {
          & {
            font-size: 10px;
          }
        }

        @media (max-width: 380px) {
          & {
            font-size: 8px;
          }
        }
      }

      .detail-bigprice {
        font-size: 35px;
        white-space: nowrap;

        @media (max-width: 600px) {
          font-size: 28px;
        }

        @media (max-width: 450px) {
          font-size: 16px;
        }

        @media (max-width: 380px) {
          font-size: 12px;
        }
      }

      .detail-price {
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        margin-top: 30px;
      }

      .detail-texttitle {
        font-size: 12px;
      }

      .detail-minibox {
        width: 100%;
        padding: 10px;
      }

      .detail-pricetotal {
        font-size: 12px;
        margin-left: 120px;
        margin-top: -10px;
        color: #777;
      }

      .detail-numbtn {
        width: 16px;
        height: 16px;
      }

      .detail-heart {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .detail-pricetotal {
        font-size: 12px;
        margin: 0 auto;
      }
    }
    .detail-span {
      width: 50%;
    }
  }
`;
