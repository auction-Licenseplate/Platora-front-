import styled from "styled-components";

export const MyInfoStyled = styled.div`
  &.main-wrap {
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

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

        @keyframes glitchBox {
          0% {
            clip-path: inset(0% 0 0 0);
            transform: translate(0, 0);
          }
          20% {
            clip-path: inset(10% 0 40% 0);
            transform: translate(-2px, -2px);
          }
          40% {
            clip-path: inset(40% 0 10% 0);
            transform: translate(2px, 2px);
          }
          60% {
            clip-path: inset(10% 0 40% 0);
            transform: translate(-2px, -2px);
          }
          80% {
            clip-path: inset(40% 0 10% 0);
            transform: translate(2px, 2px);
          }
          100% {
            clip-path: inset(0% 0 0 0);
            transform: translate(0, 0);
          }
        }

        &::before {
          border-color: rgba(255, 0, 0, 0.5);
          animation: glitchBox 0.5s infinite linear alternate;
        }

        &::after {
          border-color: rgba(0, 255, 255, 0.5);
          animation: glitchBox 0.5s infinite linear alternate-reverse;
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
