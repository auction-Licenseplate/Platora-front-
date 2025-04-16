import styled from "styled-components";
import { Button } from "antd";

export const TopBtnStyled = styled(Button)`
  position: fixed;
  width: 40px;
  height: 40px;
  bottom: 20px;
  right: 20px;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);

  .anticon {
    color: black;
  }

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;
