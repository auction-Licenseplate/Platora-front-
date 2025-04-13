import styled from "styled-components";

export const SoonProductStyled = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 70px auto 0 auto;
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    & {
      margin: 30px auto 0 auto;
    }
  }

  .mainFont {
    margin-bottom: 30px;

    @media (max-width: 550px) {
      & {
        margin-bottom: 70px;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    opacity: 1;
    z-index: 10;
    margin-top: -165px;
    transition: opacity 0.3s ease, color 0.3s ease;
    font-size: 35px;

    &::after {
      display: none;
    }

    @media (max-width: 550px) {
      & {
        margin-top: -130px;
      }
    }
  }

  .swiper-button-prev {
    left: 30px;

    @media (max-width: 550px) {
      & {
        left: 60px;
      }
    }

    @media (max-width: 360px) {
      & {
        left: 40px;
      }
    }
  }

  .swiper-button-next {
    right: 30px;

    @media (max-width: 550px) {
      & {
        right: 60px;
      }
    }

    @media (max-width: 360px) {
      & {
        right: 40px;
      }
    }
  }

  /* swiper */
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
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  @media (max-width: 1200px) {
    .soon-card {
      max-width: 350px;
    }
  }

  @media (max-width: 600px) {
    .soon-card {
      max-width: 400px;
    }
  }

  .soon-card:hover {
    transform: scale(1.05);
  }

  .soon-image {
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

    .soonImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 5px 5px 0 0;
      transition: transform 0.3s ease-in-out;
      filter: blur(5px);
    }

    .soonImg.clear {
      filter: none;
    }
  }

  .soon-info {
    padding: 10px 20px 20px 20px;
    text-align: start;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 7px;

    .priceFont {
      font-size: 14px;

      .price {
        font-size: 20px;
        color: #333;
        font-weight: 600;
        margin-bottom: 5px;
      }
    }

    .time-left {
      font-size: 12px;
      color: #777;
    }

    .seller {
      font-size: 12px;
      color: #777;
      margin-top: -5px;
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
  }
`;
