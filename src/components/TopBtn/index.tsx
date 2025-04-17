// TopBtn.tsx
import React, { useState, useEffect } from "react";
import { Affix } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { animateScroll as scroll } from "react-scroll";
import { TopBtnStyled } from "./styled";

const TopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const btnPosition = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", btnPosition);
    return () => {
      window.removeEventListener("scroll", btnPosition);
    };
  }, []);

  return (
    <Affix offsetBottom={20} style={{ right: 20, position: "fixed" }}>
      <TopBtnStyled
        shape="circle"
        icon={<UpOutlined />}
        onClick={() => scroll.scrollToTop({ smooth: true })}
        aria-label="Scroll to top"
        className={isVisible ? "visible" : ""}
      />
    </Affix>
  );
};

export default TopBtn;
