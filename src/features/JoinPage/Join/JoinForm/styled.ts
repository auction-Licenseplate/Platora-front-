import styled from "styled-components";

export const JoinFormStyled = styled.div`
  &.joinFrom-wrap {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    label {
      margin-top: 10px;
    }

    Input {
      width: 100%;
      margin-top: 10px;
    }

    .join-div {
    }

    .join-errormessage {
      color: red;
      font-size: 12px;
      height: 20px;
    }

    .joinForm-container {
      max-width: 1280px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .joinForm-btnDiv {
      display: flex;
      justify-content: center;
    }
    .join-check {
      background-color: #777;
      border: #777;
      margin-top: -7px;
      margin-bottom: 7px;
    }
    .joinform-input {
      border: none;
    }
    .joinform-input:hover,
    .joinform-input:focus {
      background-color: rgba(255, 255, 255, 0.45) !important;
      color: #fff !important;
      border-color: #777 !important;
      box-shadow: none !important;
    }
    .joinbtn {
      background-color: #777;
      border: #777;
      color: #fff;
    }
  }
`;
