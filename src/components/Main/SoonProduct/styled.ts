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
    margin-bottom: 20px;

    @media (max-width: 550px) {
      & {
        margin-bottom: 80px;
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
    border-radius: 10px;
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
