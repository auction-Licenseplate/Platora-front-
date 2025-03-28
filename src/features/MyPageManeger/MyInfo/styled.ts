import styled from "styled-components";

export const MyInfoStyled = styled.div`
  &.main-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .main-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;

      .inputContainer {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 30px;
        background-color: rgba(255, 255, 255, 0.45);
        padding: 50px;
        border-radius: 15px;

        .inputs {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          h2 {
            width: 100px;
          }

          .input {
            width: 70%;

            &:read-only {
              pointer-events: none;
              background-color: rgba(255, 255, 255, 0.67);
            }
          }
        }

        .returnPoint {
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
`;
