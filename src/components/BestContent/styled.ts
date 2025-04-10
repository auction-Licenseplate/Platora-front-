import styled from "styled-components";

export const BestContentStyled = styled.div`
  &.main-wrap-best {
    width: 100%;

    .image-container {
      position: relative;
      width: 100%;
      height: 90vh;

      @media (max-width: 768px) {
        height: 50vh;
      }

      @media (max-width: 480px) {
        height: 40vh;
      }
    }
  }
`;
