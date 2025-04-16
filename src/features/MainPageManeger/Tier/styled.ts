import styled from "styled-components";

export const TierStyled = styled.div`
  &.main-wrap-teir {
    max-width: 100%;

    .grade-tab-wrapper {
      display: flex;
      gap: 20px;
      margin-top: 130px;
      justify-content: center;

      @media (max-width: 768px) {
        opacity: 0;
        margin-top: 50px;
        overflow: hidden;
      }
    }

    .grade-tab {
      position: relative;
      font-size: 16px;
      cursor: pointer;
      padding-bottom: 5px;
      transition: color 0.3s;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0%;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.selected {
        font-weight: bold;

        &::after {
          width: 100%;
        }
      }
    }
  }
`;
