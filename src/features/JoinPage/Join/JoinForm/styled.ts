import styled from "styled-components";

export const JoinFormStyled = styled.div`
  &.joinFrom-wrap {
    width: 100vw;
    max-width: 100;
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
      width: 100%;
      font-size: 12px;
      height: 20px;
    }
    .joinform-divcontainer {
      width: 30%;

      @media (max-width: 950px) {
        & {
          width: 40%;
        }
      }
      @media (max-width: 768px) {
        & {
          width: 80%;
        }
        .join-errormessage {
          font-size: 8px;
        }
      }
    }
    .joinform-formcontainer {
      width: 100%;
      max-width: 1280px;
    }
    .joinbtn {
      width: 100%;
      margin-top: 10px;
    }
    .joinForm-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .joinForm-btnDiv {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .join-check {
      width: 100%;
      background-color: #777;
      border: #777;
      margin: -2px auto 15px auto;
      display: block;
    }
    .joinform-input {
      border: none !important;
      border-bottom: 1px solid #555 !important;
      border-radius: 0 !important;
      background: transparent;
      transition: none !important;
    }
    .joinform-input:hover,
    .joinform-input:focus {
      border-bottom: 1px solid #777 !important;
      box-shadow: none !important;
      outline: none !important;
    }
  }
`;
