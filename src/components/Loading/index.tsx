import React from "react";
import { SpinnerWrapper } from "./styled";
import Image from "next/image";
import { Spin } from "antd";

import carIcon from "@/assets/images/carIcon.gif";

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper className="loading">
      <Spin size="large" />
      <Image className="carIcon" src={carIcon} alt="carIcon" />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
