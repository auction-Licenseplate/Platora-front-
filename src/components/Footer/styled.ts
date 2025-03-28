import styled from "styled-components";

export const FooterStyled = styled.div`
  &.main-wrap {
    position: relative;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 300px;
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
    }
  }
`;
