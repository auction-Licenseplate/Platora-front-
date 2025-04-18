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
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 30px;
        border-radius: 5px;
        position: relative;
        background-color: rgb(255, 255, 255);

        .infoText {
          color: rgb(137, 137, 137);
          width: 100%;
          display: flex;
          gap: 10px;
          align-items: center;

          .infoIcon {
            width: 17px;
            height: 17px;
            cursor: pointer;
          }
        }

        .inputTexts {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -5px;
        }

        .inputs {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 10px;
          position: relative;

          .inputTextIcon {
            width: 23px;
            height: 21px;
          }

          p {
            width: 150px;
            font-size: 15px;
          }

          .input {
            width: 80%;
            background-color: rgba(243, 243, 243, 0.5);
          }

          .fileInput {
            background-color: rgba(255, 255, 255, 0);
            border: none;
          }

          .fileInput {
            cursor: pointer;
          }

          .upLoad {
            width: 100%;
            display: flex;
            gap: 30px;
            align-items: center;

            .ant-btn:hover,
            .ant-btn:active,
            .ant-btn:focus {
              color: rgb(131, 131, 131) !important;
            }
          }

          .upLoad Button {
            border: 1px solid rgb(194, 194, 194);
          }
        }

        .readOnly:read-only input {
          pointer-events: none;
          background-color: rgba(243, 243, 243, 0.5);
        }

        .passBtn {
          width: 200px;
          padding: 5px 10px;
          border-radius: 10px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
          background-color: #ffffff !important;
        }

        .passBtn:disabled {
          pointer-events: none;
        }

        .passBtn:hover {
          transform: scale(1.05);
        }

        button {
          background-color: #ffffff !important;
        }

        .pointInfos {
          cursor: pointer;
          display: flex;
          gap: 60px;
          margin: 10px 0;

          p {
            position: relative;
            font-size: 14px;

            &::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -3px;
              width: 0%;
              height: 1px;
              background-color: #7b7b7b;
              transition: width 0.3s ease-in-out;
            }

            &:hover::after {
              width: 100%;
            }
          }
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

    @media (max-width: 768px) {
      .inputContainer {
        width: 100% !important;
      }
    }

    @media (max-width: 590px) {
      .inputs {
        flex-direction: column;
        text-align: center;

        input,
        .input {
          width: 100% !important;
        }
      }

      .pointInfos {
        gap: 20px !important;

        p {
          font-size: 12px !important;
        }
      }

      .ant-upload-wrapper {
        display: flex !important;
        flex-direction: column !important;
        margin-top: 10px;
      }

      .ant-upload-list {
        margin: -7px 0 10px 0 !important;
      }
    }
  }
`;
