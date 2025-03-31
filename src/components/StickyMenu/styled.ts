import styled from "styled-components";

export const StickyMenuStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: flex-start;
    width: 100%;

    .title {
      font-size: 40px;
      text-shadow: 1.5px 1.5px 0 #ff0000, -1.5px -1.5px 0 #00ffff;
    }

    .myPageSticky {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 30px;
      padding: 10px;

      .cursor {
        cursor: pointer;
        transition: text-shadow 0.5s ease;

        &:hover:not(.active) {
          text-shadow: 0.5px 0.5px 2px #ff0000, -0.5px -0.5px 2px #00ffff;
        }
      }
    }

    .active {
      text-shadow: 1.5px 1.5px 0 #ff0000, -1.5px -1.5px 0 #00ffff;
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
