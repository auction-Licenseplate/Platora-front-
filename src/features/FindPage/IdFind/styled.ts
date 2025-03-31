import styled from "styled-components";

export const IdFindStyled = styled.div`
  &.IdFind-wrap {
    margin: auto;
    margin-bottom: 50px;
    width: 100%;

    .IdFind-container {
      max-width: 1280px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
    }

    .IdFind-idDiv {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;
      gap: 3px;
    }

    .IdFind-textDiv {
      display: flex;
      flex-wrap: nowrap;
    }
    .IdFind-form {
      width: 20%;
    }
    Input {
      width: 100%;
    }
    .IdFind-findDiv {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .IdFind-findidDiv {
      font-size: 1vw;
      color: white;
      margin-top: 10px;
    }
  }
`;
