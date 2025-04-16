import styled from "styled-components";

export const MyAccountStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 30px !important;

    .main-container {
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 0 10px;
      width: 100%;

      .myInfoContainer {
        width: 100%;
      }
    }
  }
`;
