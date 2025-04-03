import styled from "styled-components";

export const StickyMenuStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: flex-start;
    width: 100%;

    .title {
      font-size: 40px;
    }

    .myPageSticky {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 30px;
      padding: 10px;

      .cursor {
        cursor: pointer;
        transition: color 0.5s ease;
      }
    }

    @media screen and (max-width: 768px) {
      & {
        display: none;
      }
      .myPageSticky {
        display: none;
      }
    }
  }
`;
