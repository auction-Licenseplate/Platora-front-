import styled from "styled-components";

export const MyPostsStyled = styled.div`
  &.main-wrap-myPosts {
    width: 100%;

    .myPostContainer {
      display: flex;
      flex-direction: column;
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px;
      align-items: center;
      justify-content: center;
    }

    .postInfoBox {
      width: 100%;
    }
  }
`;
