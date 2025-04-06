import styled from "styled-components";

export const SoonProductStyled = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  .swiper {
    width: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .soon-card {
    width: 100%;
    max-width: 250px;
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
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .soon-info {
    padding: 10px;
    text-align: center;
    cursor: pointer;

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
