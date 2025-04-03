import styled from "styled-components";

export const MyPostStyled = styled.div`
  &.main-wrap-myPost {
    width: 100%;

    .myInfoContainer {
      width: 100%;
    }

    .postsInfo {
      display: flex;
      align-items: center;
      padding: 10px;
      position: relative;
      width: 100%;
      height: 150px;
    }

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
    }

    .circle:first-child {
      left: -15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .circle:last-child {
      right: -15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .postImg {
      width: 65%;
      height: 120px;
      background: #f1f1f1;
      border-radius: 5px;
      margin-left: 10px;
      object-fit: cover;
    }

    .postLine {
      width: 1px;
      height: 120px;
      border-left: 1px dashed;
      margin: 0 10px;
    }

    .postTexts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }

    .postTitle {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .postContents {
      font-size: 14px;
      color: #333;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }
`;
