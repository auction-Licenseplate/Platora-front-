import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .main-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      padding: 10px 30px;
      width: 100%;
      max-width: 1280px;
      height: 100%;

      .leftContainer {
        width: 30%;
        position: sticky;
        top: 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        background-color: rgba(255, 255, 255, 0.45);
        border-radius: 15px;
        padding: 15px;
      }

      .mainContent {
        width: 70%;
      }
    }
  }
`;
