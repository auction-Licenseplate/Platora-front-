import styled from "styled-components";

export const DetailStyled = styled.div`
  &.detailstyled {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: white;

    .detail-wrap {
      width: 100%;
      max-width: 1280px;
      margin: 100px auto;
    }

    .detail-title {
      font-size: 2vw;
      font-weight: 500;
      margin-left: 20px;
      color: black;
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
      margin-top: 20px;
    }
    .detail-imgcontainer,
    .detail-textcontainer {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .detail-textcontainer {
      align-items: flex-start;
    }

    .detail-price {
      width: 50%;
      font-size: 1.3vw;
      font-weight: 500;
      padding-left: 30px;
      margin-bottom: 20px;
      display: flex;
      align-items: baseline;
      gap: 10%;
      text-align: center;
      color: black;
    }

    .detail-bigprice {
      font-size: 2.3vw;
    }

    .detail-textdiv {
      width: 50%;
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      gap: 5%;
      text-align: start;
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
      white-space: nowrap; /* 줄바꿈 방지 */
      display: flex;
      gap: 3px;
    }
    .detail-pricetotal {
      font-size: 12px;
      margin-left: 120px;
      margin-top: -10px;
      color: #777;
    }

    .detail-btndiv {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
    }

    .detail-heart {
      width: 40px;
      height: 40px;
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
      display: flex;
      justify-content: center;
    }
    .detail-detailBox {
      background-color: #fafafa;
      width: 80%;
      border: 1px solid lightgray;
      margin-top: 50px;
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
      .detail-price,
      .detail-textdiv {
        width: 90%;
      }
      .detail-textcontainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .detail-title {
        font-size: 24px;
        text-align: center;
      }

      .detail-bigprice {
        font-size: 20px;
      }

      .detail-price {
        font-size: 16px;
        justify-content: space-between;
        padding-left: 0;
      }

      .detail-texttitle {
        font-size: 12px;
      }

      .detail-minibox {
        padding: 15px;
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
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
      .detail-pricetotal {
        font-size: 10px;
      }
    }
    .detail-span {
      width: 50%;
    }
  }
`;
