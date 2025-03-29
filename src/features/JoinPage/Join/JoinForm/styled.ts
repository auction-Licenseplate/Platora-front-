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
  }
`;
