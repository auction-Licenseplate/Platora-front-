import styled from "styled-components";

export const MainStyled = styled.div`
  &.main-wrap {
    max-width: 100%;

    .paddingAd {
      padding: 0 30px;
    }

    .mainBoxContainer {
      max-width: 100%;
      padding: 30px;
    }

    .wrtieBtnContainer {
      width: 100%;
      max-width: 1360px;
      padding: 30px;
      display: flex;
      justify-content: flex-end;
    }

    .writeBtn {
      width: 200px;
      height: 35px;
      transition: background-color 0.3s ease-in, color 0.3s ease-in;

      &:hover {
        .mainFont {
          color: #000000;
        }
      }

      .mainFont {
        font-size: 17px;
      }

      @media (max-width: 520px) {
        & {
          margin: 0 auto;
        }
      }
    }
  }
`;
