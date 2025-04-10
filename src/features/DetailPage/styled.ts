import styled from "styled-components";

export const DetailStyled = styled.div`
  &.detailstyled {
    width: 100%;
    margin: 0 auto;
    .detail-wrap {
      width: 100%;
      max-width: 1280px;
      margin: 100px auto;
    }

    .detail-title {
      font-size: 2vw;
      font-weight: 500;
      margin-left: 20px;
    }
    .detail-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .detail-imgcontainer {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .detail-textcontainer {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .detail-price {
      width: 50%;
      font-size: 1.5vw;
      font-weight: 500;
      padding-left: 30px;
      display: flex;
      align-items: baseline;
      gap: 10%;
      text-align: center;
    }
    .detail-bigprice {
      font-size: 2.3vw;
    }
    .detail-text {
      margin-right: 50px;
    }
    .detail-righttext {
      margin-left: 20px;
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
    }
    .detail-minibox {
      width: 100%;
      border: 1px solid #fafafa;
      background-color: #fafafa;
      padding: 20px;
      border-radius: 10px;
    }
    .detail-thicktext {
      font-weight: 600;
    }
    .detail-pricespan {
      width: 100%;
    }
  }
`;
