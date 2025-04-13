import styled from "styled-components";

export const AipointStyled = styled.div`
  .inputTexts {
    margin-top: 10px;
    display: flex !important;
    flex-direction: row !important;
    gap: 30px;

    .rankBtn {
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      background: none;

      p {
        position: relative;
        font-size: 14px;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px !important;
          width: 0%;
          height: 1px;
          background-color: #7b7b7b;
          transition: width 0.3s ease-in-out;
        }

        &:hover::after {
          width: 100%;
        }
      }

      &:disabled {
        cursor: not-allowed;

        p::after {
          display: none !important;
        }
      }
    }

    @media (max-width: 590px) {
      & {
        gap: 0px !important;
      }
    }
  }
`;
