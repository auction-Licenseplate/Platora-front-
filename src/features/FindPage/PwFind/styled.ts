// styled.ts
import styled from "styled-components";

export const PwFindStyled = styled.div<{ display: string }>`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .loginForm-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .loginForm-container {
    width: 520px;
    padding: 80px;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
  }
  // .PwFind-container1에 container의 디자인을 그대로 적용
  .loginForm-container1 {
    width: 520px;
    padding: 40px;
    border-radius: 12px;

    display: ${(props) => props.display || "flex"};
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
  }

  .loginForm-idDiv {
    margin-bottom: 20px;
    width: 100%;
    position: relative;
  }

  .loginForm-textDiv {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  .loginForm-container input,
  .loginForm-container1 input {
    border: none !important;
    border-bottom: 1px solid #555 !important;
    border-radius: 0 !important;
    background: transparent;
    transition: none !important;
  }

  .loginForm-container input:hover,
  .loginForm-container input:focus,
  .loginForm-container1 input:hover,
  .loginForm-container1 input:focus {
    border-bottom: 1px solid #777 !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .pwfind-error {
    margin-top: 5px;
    font-size: 13px;
    color: red;
    text-align: left;
  }

  button {
    width: 100%;
    border: none !important;
    font-weight: bold;
    height: 44px;
    transition: background-color 0.3s ease !important;
  }

  .loginForm-findDiv {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 16px 0;
    font-size: 14px;
    width: 100%;

    span {
      cursor: pointer;
      transition: color 0.2s;
    }
  }
`;
