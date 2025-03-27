import styled from "styled-components";

export const JoinFormStyled = styled.div`
  &.joinFrom-wrap {
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

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
`;
