import styled from "styled-components";

export const StickyMenuStyled = styled.div`
  width: 240px;
  margin-top: 30px !important;

  .myPageSticky {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
    height: 450px;
  }

  .menus {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .cursor {
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 8px 4px;
    text-align: left;
    position: relative;
    display: inline-block;
    font-weight: bold !important;

    &::after {
      content: "";
      position: absolute;
      bottom: 5px;
      left: 0;
      height: 2px;
      width: 0;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .cursor.active {
    font-weight: bold !important;
  }

  .cursor.active::after {
    width: 100%;
  }

  .bottomMenu {
    width: 100%;

    p {
      position: relative;
      color: rgba(136, 136, 136, 0.65);
      font-size: small;
      margin: 0 0 10px 50px;
      cursor: pointer;
      width: 50px;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 1px;
        width: 0;
        transition: width 0.3s ease;
        background-color: rgb(201, 201, 201);
      }

      &:hover::after {
        width: 100%;
      }
    }

    .logoImg {
      width: 150px;
      height: 25px;
    }
  }
`;
