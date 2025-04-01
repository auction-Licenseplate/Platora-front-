import styled from "styled-components";

export const WritePageStyled = styled.div`
  &.main-wrap {
    width: 100%;

    .writeContent {
      max-width: 1280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      padding: 30px;
    }

    .writeInput {
      width: 100%;
      max-width: 70%;
      display: flex;
      align-items: center;
      gap: 30px;

      label {
        width: 50px;
      }
    }

    .writeImgInputs {
      display: flex;
      gap: 20px;
      margin-top: 10px;
    }

    .writePreInput {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30%;
    }

    .writePreInput label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .previewContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      border: 2px dashed #ddd;
      border-radius: 8px;
      margin-top: 10px;
      background-color: #f9f9f9;
    }

    .previewImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .previewText {
      color: #999;
      font-size: 14px;
    }

    .editorBox {
    }
  }
`;
