import styled from "styled-components";

export const PlusInfoStyled = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &.plusinfo-wrap {
    .plusinfo-container {
      width: 520px;
      padding: 80px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .plusinfo-idDiv {
      margin-bottom: 20px;
      width: 100%;
      position: relative;
    }

    .plusinfo-textDiv {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      color: white;
    }

    .plusinfo-container input {
      width: 100%;
      border: none !important;
      border-bottom: 1px solid #555 !important;
      border-radius: 0 !important;
      background: transparent;
      transition: none !important;
    }

    .plusinfo-container input:hover,
    .plusinfo-container input:focus {
      border-bottom: 1px solid #777 !important;
      box-shadow: none !important;
      outline: none !important;
    }

    button {
      width: 100%;
      border: none !important;
      font-weight: bold;
      height: 44px;
      transition: background-color 0.3s ease !important;
      margin-top: 8px;
    }
  }
`;
