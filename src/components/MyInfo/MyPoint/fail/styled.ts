import styled from "styled-components";

export const PaymentFailStyled = styled.div`
  &.main-wrap-error {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #ff4d4f; /* 에러 빨간색 */
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #ccc;
    }

    button {
      width: 200px;

      color: #000;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      margin: 0.5rem 0;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f1c40f;
      }

      &:nth-child(4) {
        background-color: #555; /* 보조 버튼 - 진한 회색 */
        color: #fff;

        &:hover {
          background-color: #333;
        }
      }
    }
  }
`;
