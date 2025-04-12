import styled from "styled-components";

export const WritePageStyled = styled.div`
  &.main-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    margin-top: 80px;
    background-color: #f4f4f4;
  }

  .writeContent {
    position: relative;
    max-width: 900px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 30px;
    display: flex;
    flex-direction: column;
  }

  .error {
    position: absolute;
    top: 78px;
    left: 35px;
    color: red !important;
    font-size: small;
  }

  .writes {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .writeInput {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .writeInput input {
      width: 100%;
      padding: 7px 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      color: #333;
      background-color: #f9f9f9;
      box-sizing: border-box;
    }

    .writeInput input:focus {
      outline: none;
    }
  }

  .writeImgInputs {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;

    @media (max-width: 750px) {
      flex-direction: column;
      align-items: center;
    }

    .writePreInput {
      width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      @media (max-width: 750px) {
        width: 100%;
      }

      .previewContainer {
        width: 100%;
        height: 150px;
        margin-top: 10px;
        border: 1px dashed #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #aaa;
        overflow: hidden;
        cursor: pointer;

        span {
          color: #aaa;
          font-size: 14px;
        }
      }

      label {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 16px;
        color: #333;
      }

      input[type="file"] {
        display: none;
      }

      .previewImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }

  .editorBox {
    margin-top: 20px;
  }

  .submitBtn {
    width: 250px;
    margin: 0 auto;
    background-color: rgb(227, 227, 227) !important;
    color: white;
    border: none;
    padding: 7px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease, opacity 0.3s ease;
  }

  .submitBtn:disabled {
    background-color: rgb(238, 238, 238) !important;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .submitBtn:hover:enabled {
    background-color: rgb(210, 210, 210) !important;
  }

  input::placeholder {
    color: #888 !important;
    font-size: 14px !important;
  }

  .rdw-editor-main {
    background-color: rgba(246, 246, 246, 0.63);
    padding: 10px;
  }
`;
