import styled from "styled-components";

export const IdFindStyled = styled.div`
  &.IdFind-wrap {
    margin: 100px auto;
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
      color: white;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .IdFind-textDiv {
      display: flex;
      flex-wrap: nowrap;
    }
    Input {
      width: 100%;
    }
  }
`;
