import styled from "styled-components";

export const LoginFormStyled = styled.div`
  &.loginForm-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .loginForm-container {
      max-width: 1280px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .loginForm-idDiv {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      margin-bottom: 10px;
      width: 100%;
    }

    .loginForm-idDiv Input {
      width: 100%;
      padding: 10;
    }
    .loginForm-textDiv {
      width: 4vw;
    }
    .loginForm-findDiv {
      display: flex;
      gap: 7px;
      font-size: 12px;
      font-weight: 100;
      color: gray;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;
