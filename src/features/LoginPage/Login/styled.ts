import styled from "styled-components";

export const LoginStyled = styled.div`
  &.login-wrap {
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .divider {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin: 20px 0;
    }

    .divider hr {
      flex-grow: 1;
      height: 1px;
      border: none;
    }

    .divider span {
      margin: 0 10px;
      font-size: 14px;
      font-weight: bold;
    }

    .loginform-socialbtn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .loginForm-socialDiv {
      display: flex;
      gap: 20px;
      margin-bottom: 50px;
    }

    Button {
      width: 100%;
    }
  }
`;
