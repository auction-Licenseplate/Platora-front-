import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.main-wrap {
    width: 100%;
    background-color: #262626;
    position: relative;

    // 토글 내용
    .toggleInfo {
      position: absolute;
      top: 0;
      width: 500px;
      height: 100vh;
      background-color: #262626;
      z-index: 1001;
      clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
    }

    .imageContainer {
      width: 100%;
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: space-between;
    }

    // 네비게이션 바
    .main-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;
    }

    // 토글 버튼
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
      background-color: cyan; /* 글리치 색상 */
    }

    .toggleBtn div::after {
      transform: translateX(2px);
      background-color: red; /* 글리치 색상 */
    }

    /* 호버 시 글리치 효과 강조 */
    .toggleBtn:hover div::before {
      transform: translateX(-5px);
    }

    .toggleBtn:hover div::after {
      transform: translateX(5px);
    }

    // 로고 이미지, 유저 아이콘
    .signUp,
    .logoImg {
      cursor: pointer;
    }
  }
`;
