import styled from "styled-components";

export const MyAccountStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .main-container {
      display: flex;
      gap: 30px;
      padding: 10px;
      width: 100%;

      .myInfoContainer {
        width: 100%;
      }
    }
  }
`;
