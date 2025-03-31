import styled from "styled-components";

interface PwFindStyledProps {
  display?: string; // display 속성
}

export const PwFindStyled = styled.div<PwFindStyledProps>`
  &.PwFind-wrap {
    margin: auto;
    margin-bottom: 50px;
    width: 100%;

    .PwFind-container {
      max-width: 1280px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
    }

    // .PwFind-container1에 container의 디자인을 그대로 적용
    .PwFind-container1 {
      max-width: 1280px;
      width: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
      display: ${(props) =>
        props.display || "flex"}; // display 속성을 flex로 설정
    }

    .PwFind-idDiv {
      width: 100%;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;
      gap: 3px;
    }

    .PwFind-textDiv {
      display: flex;
      flex-wrap: nowrap;
    }
    .PwFind-textDiv1 {
      display: flex;
      flex-wrap: nowrap;
    }
    .PwFind-form {
      width: 20%;
    }
    Input {
      width: 100%;
    }
    .PwFind-findDiv {
      color: gray;
      margin-top: 10px;
      margin-bottom: 15px;
    }

    .pwfind-error {
      color: red;
      height: 20px;
      font-size: 1vw;
    }
  }
`;
