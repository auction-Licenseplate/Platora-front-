import styled from "styled-components";

export const MyInfoStyled = styled.div`
  &.main-wrap {
    margin-top: 70px;
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
          position: relative;

          h3 {
            width: 150px;
          }

          .input {
            width: 70%;
            border: none;
          }

          .fileInput {
            cursor: pointer;
          }

          .upLoad {
            width: 100%;
            display: flex;
            gap: 30px;
          }

          .upLoad Button {
            border: none;

            &:hover {
              border: none;
              color: black;
            }
          }
        }

        .readOnly:read-only {
          pointer-events: none;
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

        .passBtn:disabled {
          pointer-events: none;
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

        .alert {
          position: absolute;
          top: 35px;
          left: 160px;
          font-size: small;
          color: rgb(185, 1, 1);
        }

        .alertCheck {
          position: absolute;
          top: 45px;
          left: 160px;
          font-size: small;
          color: rgb(185, 1, 1);
        }
      }
    }
  }
`;
