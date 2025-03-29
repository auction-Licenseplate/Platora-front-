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
        align-items: center;
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

          h3 {
            width: 150px;
          }

          .input {
            width: 70%;

            &:read-only {
              pointer-events: none;
              background-color: rgba(255, 255, 255, 0.67);
            }
          }
        }

        .passBtn {
          width: 200px;
          padding: 5px 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .passBtn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .pointInfos {
          cursor: pointer;
          display: flex;
          gap: 30px;
        }

        .input-group Select {
          width: 200px;
        }

        .inputAlert {
          width: 100%;
          display: flex;
          flex-direction: column;

          .alert {
            position: absolute;
            font-size: small;
            color: rgb(216, 37, 37);
          }
        }
      }
    }
  }
`;
