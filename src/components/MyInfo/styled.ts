import styled from "styled-components";

export const MyInfoStyled = styled.div`
  &.main-wrap-info {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;

    .main-container {
      width: 100%;
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
        padding: 50px;
        border-radius: 15px;
        position: relative;

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 4px solid;
          border-radius: 15px;
          box-sizing: border-box;
          mix-blend-mode: difference;
          pointer-events: none;
        }

        .vehicleInputs {
          width: 70%;
          display: flex;
          flex-direction: column;
        }

        .vehicleInput {
          width: 100%;
          border: none;
          background-color: rgb(190, 190, 190);
        }

        .plateInput {
          width: 100%;
          border: none;
          margin: 10px 0;
          background-color: rgb(190, 190, 190);
        }

        .inputTexts {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

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
            background-color: rgb(190, 190, 190);
          }

          .fileInput {
            background-color: rgba(255, 255, 255, 0);
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

    @media screen and (max-width: 768px) {
      .inputContainer {
        width: 100% !important;
      }
    }

    @media screen and (max-width: 590px) {
      .inputs {
        flex-direction: column;
        text-align: center;

        input,
        .input {
          width: 100% !important;
        }
      }
    }
  }
`;
