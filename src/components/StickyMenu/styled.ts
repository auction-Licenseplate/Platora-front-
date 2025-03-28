import styled from "styled-components";

export const StickyMenuStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .main-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 10px;
    }
  }
`;
