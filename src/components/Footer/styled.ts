import styled from "styled-components";

export const FooterStyled = styled.div`
  &.main-wrapfooter {
    position: relative;
    bottom: 0;
    display: flex;
    width: 100%;
    height: auto;
    padding: 30px 15px;
    background-color: #262626;

    .main-container {
      width: 100%;
      color: white;
      display: flex;
      justify-content: space-between;

      .textsInfo {
        display: flex;
        flex-direction: column;
        margin-top: 35px;
        gap: 10px;
      }

      .social-icons {
        display: flex;
        gap: 20px;
      }
    }

    @media screen and (max-width: 768px) {
      .main-container {
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
      }

      .social-icons {
        margin-top: 30px;
        align-items: center;
      }
    }
  }
`;
