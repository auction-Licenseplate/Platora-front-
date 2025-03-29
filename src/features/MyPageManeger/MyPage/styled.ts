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

      .leftContainer {
        width: 30%;
        height: 200px;
        position: sticky;
        top: 100px;
        background-color: rgba(255, 255, 255, 0.45);
        border-radius: 15px;
        padding: 15px;
        z-index: 10;
      }

      .mainContent {
        width: 70%;
      }
    }
  }
`;
