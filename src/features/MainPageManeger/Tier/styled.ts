import styled from "styled-components";

export const TierStyled = styled.div`
  &.main-wrap-teir {
    max-width: 100%;

    .grade-tab-wrapper {
      display: flex;
      gap: 15px;
      margin: 30px 0;
      justify-content: center;
    }

    .grade-tab {
      position: relative;
      font-size: 16px;
      cursor: pointer;
      padding-bottom: 5px;
      color: #888;
      transition: color 0.3s;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0%;
        background-color: #333;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.selected {
        color: #000;
        font-weight: 600;

        &::after {
          width: 100%;
          background-color: #000;
        }
      }
    }
  }
`;
