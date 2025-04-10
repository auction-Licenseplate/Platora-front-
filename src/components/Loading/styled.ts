import styled, { keyframes } from "styled-components";

export const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .carIcon {
    width: 60px;
    height: 60px;
  }
`;
