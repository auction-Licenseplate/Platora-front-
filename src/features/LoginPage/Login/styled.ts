import styled from "styled-components";

export const LoginStyled = styled.div`
  width: 100vw;
  height: 70vh;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .loginForm-container1 {
    width: 80%;
  }

  .loginForm-container {
    width: 520px;
    background-color: #2c2c2c;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .loginForm-idDiv {
    margin-bottom: 20px;
    width: 100%;
    position: relative;
  }
  .loginForm-seePw {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

  .loginForm-textDiv {
    color: #fff;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  input {
    background-color: #3c3c3c !important;
    color: #fff !important;
    border: 1px solid #555 !important;
    transition: none !important;
    &::placeholder {
      color: lightgray !important; /* ✅ 흰색으로 변경 */
      opacity: 0.8; /* 옵션: 약간 투명하게 */
    }
  }

  input:hover,
  input:focus {
    background-color: #3c3c3c !important;
    color: #fff !important;
    border-color: #777 !important;
    box-shadow: none !important;
  }

  button {
    width: 100%;
    background-color: #0070f3 !important;
    color: white !important;
    border: none !important;
    font-weight: bold;
    height: 44px;
    transition: background-color 0.3s ease !important;
  }

  button:hover,
  button:focus {
    background-color: #0056c3 !important;
    color: white !important;
  }

  .loginForm-findDiv {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 16px 0;
    color: #bbb;
    font-size: 14px;
    width: 100%;

    span {
      cursor: pointer;
      transition: color 0.2s;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    color: #bbb;
    font-size: 14px;
    margin: 24px 0;
    width: 100%;

    hr {
      flex: 1;
      height: 1px;
      background-color: #444;
      border: none;
    }
  }

  .loginForm-socialDiv {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 4px;
    width: 100%;
  }

  .loginform-socialbtn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
