import styled from "styled-components";

export const SoonProductStyled = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 10px;
  width: 100%;
  max-width: 1280px;

  .swiper-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px !important;
    padding: 10px;
    box-sizing: border-box;
    margin-right: 0px !important;
  }

  .soon-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .soon-card:hover {
    transform: scale(1.05);
  }

  .soon-image {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
  }

  .soon-info {
    padding: 10px;
    text-align: center;

    h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .price {
      font-size: 14px;
      color: #333;
      margin-bottom: 5px;
    }

    .time-left {
      font-size: 12px;
      color: #777;
    }
  }
`;
