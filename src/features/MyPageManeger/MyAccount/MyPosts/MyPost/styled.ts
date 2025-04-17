import styled, { css } from "styled-components";

export const MyPostStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isWide",
})<{ isWide?: boolean }>`
  &.main-wrap-myPost {
    width: 100%;

    .myInfoContainer {
      width: 100%;
    }

    .postsInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px;
      position: relative;
      width: 100%;
      height: auto;
      flex-wrap: wrap;
      gap: 10px;
      box-sizing: border-box;
      margin-bottom: 30px;
    }

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
    }

    .circle:first-child {
      left: -15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .circle:last-child {
      right: -15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .postImg {
      position: relative;
      width: 100%;
      min-width: 200px;
      max-width: 400px;
      height: 120px;
      border-radius: 5px;
      margin-left: 20px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .postLine {
      width: 1px;
      height: 120px;
      border-left: 1px dashed #999;
      margin: 0 10px;
      transition: all 0.3s ease;
    }

    .cursorPointer {
      cursor: pointer;
    }

    .postTexts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      min-width: 200px;
      align-items: flex-start;
      text-align: left;
    }

    .postTitle {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .postContents {
      font-size: 14px;
      color: #333;
      display: flex;
      gap: 4px;
    }

    .postTexts {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .deleteBtn {
      margin-top: 40px;
      width: 70px;
      height: 30px;
      border: 1px solid rgb(189, 189, 189);
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
      transition: background-color 0.2s ease-in-out;

      @media (max-width: 1240px) {
        margin-left: -30px;
      }
    }

    .deleteBtn:hover {
      background-color: rgb(233, 183, 183);
    }

    .badgeTitle {
      display: flex;
      align-items: center;
      gap: 7px;

      .badgeIcon {
        width: 18px;
        height: 18px;
      }

      .favoriteImg {
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }
    }

    .prevIcon,
    .nextIcon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prevIcon {
      left: 8px;
    }

    .nextIcon {
      right: 8px;
    }

    .empty-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emptyImg {
      width: 400px;
      height: 400px;
      opacity: 0.5;
    }

    /* isWide가 true일 때(모달 안일 때) */
    ${({ isWide }) =>
      isWide &&
      css`
        .postsInfo {
          flex-direction: column;
          align-items: center;
          padding: 10px 30px;
          background-color: rgb(227, 227, 227);
        }

        .badgeTitle {
          font-weight: bold;
          font-size: 17px;
        }

        .postImg {
          max-width: 400px;
          margin: 10px auto 0 auto;
        }

        .postLine {
          width: 90%;
          height: 1px;
          border-left: none;
          border-top: 1px dashed #000000;
          margin: 10px 0;
        }

        .postTexts {
          width: 100%;
          align-items: center;
          text-align: center;
          margin: 5px 0 10px 0;
        }

        .postContents {
          font-size: 14px;
          align-items: center;
        }

        .circle {
          background-color: #ffffff;
        }
      `}

    /* 원래의 반응형 (isWide가 false일 때만 작동) */
    ${({ isWide }) =>
      !isWide &&
      css`
        @media (max-width: 1200px) {
          .postsInfo {
            flex-direction: column;
            align-items: center;
            padding: 10px 30px;
          }

          .postImg {
            max-width: 500px;
            margin: 0 auto;
          }

          .postLine {
            width: 90%;
            height: 1px;
            border-left: none;
            border-top: 1px dashed #999;
            margin: 10px 0;
          }

          .postTexts {
            width: 100%;
            align-items: center;
            text-align: center;
            margin-bottom: 10px;
          }

          .postTitle {
            font-size: 15px;
          }

          .postContents {
            font-size: 13px;
            flex-direction: column;
            align-items: center;

            .deleteBtn {
              margin: 10px 0;
              width: 100%;
            }
          }
        }
      `}
  }
`;
