import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.main-wrap {
    width: 100%;
    background-color: rgb(0, 0, 0);
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
      z-index: 1003;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }

      /* 토글 슬라이드 */
      &.open {
        transform: translateX(0);
      }
    }

    hr {
      margin: 10px;
      width: 95%;
      border: none;
      border-top: 1px solid #ccc;
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
      position: fixed;
      width: 100%;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;
      z-index: 1000;
      box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.5);
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
      position: relative;
      transition: 0.3s;
    }

    /* 토글 안 카테고리 */
    .categoryContainer {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px 10px 10px 15px;
      font-size: 16px;
      font-weight: bold;

      .toggleInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .tier-container {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .tier-title {
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        user-select: none;

        .tier-icon {
          margin-top: 5px;
          font-size: 15px;
        }
      }

      .tier-list {
        display: flex;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        margin: 15px 0 0 5px;
      }

      .tier-list.open {
        max-height: 400px;
      }

      .tier-item {
        cursor: pointer;
        transition: 0.3s;
      }

      .tier-item:hover {
        color: rgb(185, 185, 185);
      }

      .toggleTexts {
        display: flex;
        flex-direction: column;
        gap: 20px;

        h3 {
          cursor: pointer;
          transition: 0.3s;
        }
      }

      .switch {
        margin-top: 20px;
      }
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
    }

    .toggleBtn div::after {
      transform: translateX(2px);
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

    .signUp {
      display: flex;
      gap: 20px;
    }

    .logoImg {
      display: flex;
      align-items: center;
      justify-content: center;
      /* margin: 0 auto; */
      width: 250px;
      height: 50px;
      cursor: pointer;
    }

    .marginLogoImg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      height: 50px;
      margin-left: 50px;
      cursor: pointer;
    }

    .centerLogo {
      margin: 0 auto;
    }

    .userIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 15px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #333;
      transition: 0.4s;
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "☀️";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 3px;
      background-color: white;
      border-radius: 50%;
      transition: 0.4s;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }

    input:checked + .slider {
      background-color: #f1c40f;
    }

    input:checked + .slider:before {
      content: "🌙";
      transform: translateX(24px);
    }

    /* 알림창 */
    .alertIcon {
      width: 27px;
      position: relative;
    }

    .alertCircle {
      position: absolute;
      top: -5px;
      right: 0px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: red;
    }

    .alertOpen {
      position: absolute;
      top: 30px;
      right: -5px;
      background: #ffffff;
      border-radius: 5px;
      padding: 10px;
      width: 300px;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

      .alertText {
        font-size: 14px;
        margin: 4px 0;
      }
    }

    .alertMessage {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .alertCheck {
        margin-right: 5px;
      }
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

      .signUp {
        display: none;
      }

      .marginLogoImg {
        margin: 0 auto;
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
  z-index: 1002;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
`;
