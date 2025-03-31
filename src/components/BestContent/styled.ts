import styled from "styled-components";

export const BestContentStyled = styled.div`
  &.main-wrap-best {
    width: 100%;

    .image-container {
      position: relative;
      width: 100%;
      height: 100vh;
      margin-top: 10px;
    }

    .title-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      font-size: 2rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* 텍스트 가독성을 높이기 위한 그림자 */
    }

    .content-title {
      margin: 0;
      padding: 0;
    }
  }
`;
