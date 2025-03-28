import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.main-wrap {
    width: 100%;
    background-color: #262626;
    position: relative;

    /* 토글 내용 */
    .toggleInfo {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 500px;
      height: 100vh;
      padding: 10px;
      background-color: #262626;
      z-index: 1001;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);

      /* 토글 슬라이드 */
      &.open {
        transform: translateX(0);
      }
    }

    hr {
      margin: 10px;
      width: 95%;
    }

    .imageContainer {
      width: 100%;
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: space-between;
    }

    .toggleLogoImg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 40px;
    }

    .main-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;
    }

    .toggleBtn {
      width: 30px;
      height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
    }

    .toggleBtn div {
      width: 100%;
      height: 4px;
      background-color: black;
      position: relative;
      transition: 0.3s;
    }

    /* 토글 안 카테고리 */
    .categoryContainer {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      color: white;
    }

    /* 글리치 효과 */
    .toggleBtn div::before,
    .toggleBtn div::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: inherit;
      top: 0;
      left: 0;
      opacity: 0.7;
      transition: 0.3s;
    }

    .toggleBtn div::before {
      transform: translateX(-2px);
      background-color: cyan;
    }

    .toggleBtn div::after {
      transform: translateX(2px);
      background-color: red;
    }

    /* 호버 시 글리치 효과 강조 */
    .toggleBtn:hover div::before {
      transform: translateX(-5px);
    }

    .toggleBtn:hover div::after {
      transform: translateX(5px);
    }

    .signUp,
    .logoImg {
      cursor: pointer;
    }

    .logoImg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      height: 50px;
    }

    .userIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 35px;
    }

    @media screen and (max-width: 768px) {
      .logoImg {
        width: 150px;
        height: 30px;
      }

      .userIcon {
        width: 35px;
        height: 15px;
      }

      .toggleInfo {
        max-width: 300px;
      }

      .toggleLogoImg {
        width: 150px;
        height: 20px;
      }
    }

    @media screen and (max-width: 560px) {
      .toggleInfo {
        max-width: 230px;
      }

      .toggleLogoImg {
        width: 120px;
        height: 15px;
      }
    }
  }
`;

/* 오버레이 */
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
`;
