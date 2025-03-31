import styled from "styled-components";

export const AdvertisingStyled = styled.div`
  &.main-wrap {
    width: 100%;
    height: 40px;
    background-color: rgb(161, 215, 218);
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
  }

  .advertising-content {
    display: flex;
    gap: 50px;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
  }

  @keyframes marquee {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  span {
    font-size: 16px;
    font-weight: bold;
    flex-shrink: 0;
  }
`;
