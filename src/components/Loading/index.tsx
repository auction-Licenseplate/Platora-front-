import React from "react";
import { Spin } from "antd";
import { SpinnerWrapper } from "./styled";

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spin size="large" />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
