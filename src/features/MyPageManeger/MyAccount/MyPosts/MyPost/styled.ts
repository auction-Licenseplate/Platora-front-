import styled, { css } from "styled-components";

export const MyPostStyled = styled.div<{ isWide?: boolean }>`
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
      width: 65%;
      min-width: 200px;
      max-width: 400px;
      height: 120px;
      border-radius: 5px;
      margin-left: 10px;
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
      flex-direction: column;
      gap: 4px;
      word-break: break-word;
    }

    .badgeTitle {
      display: flex;
      align-items: center;
      gap: 7px;

      .badgeIcon {
        width: 18px;
        height: 18px;
      }
    }

    /* isWide가 true일 때(모달 안일 때) */
    ${({ isWide }) =>
      isWide &&
      css`
        .postsInfo {
          flex-direction: column;
          align-items: center;
          padding: 10px 30px;
        }

        .postImg {
          width: 100%;
          margin: 0 auto;
        }

        .postLine {
          width: 80%;
          height: 1px;
          border-left: none;
          border-top: 1px dashed #999;
          margin: 10px 0;
        }

        .postTexts {
          width: 100%;
          align-items: center;
          text-align: center;
        }

        .postTitle {
          font-size: 15px;
        }

        .postContents {
          font-size: 13px;
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
            width: 100%;
            margin: 0 auto;
          }

          .postLine {
            width: 80%;
            height: 1px;
            border-left: none;
            border-top: 1px dashed #999;
            margin: 10px 0;
          }

          .postTexts {
            width: 100%;
            align-items: center;
            text-align: center;
          }

          .postTitle {
            font-size: 15px;
          }

          .postContents {
            font-size: 13px;
            align-items: center;
          }
        }
      `}
  }
`;
