import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;

    .mainContainer {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 30px;
      padding: 10px 30px;
      width: 100%;
      max-width: 1280px;
      height: auto;
      margin-top: 0;

      .leftContainer {
        width: 30%;
        height: auto;
        position: sticky;
        align-items: center;
        display: flex;
        top: 70px;
        margin-bottom: 30px;
        z-index: 10;
      }

      .line {
        width: 1px;
        margin-top: 50px;
        height: 500px;
      }

      .mainContent {
        width: 70%;
      }
    }

    @media screen and (max-width: 768px) {
      .leftContainer,
      .line {
        display: none !important;
      }

      .mainContent {
        width: 100% !important;
        padding: 20px !important;
      }
    }

    @media screen and (max-width: 590px) {
      .mainContent {
        padding: 0px !important;
      }
    }
  }
`;
