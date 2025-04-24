import React, { useState, useEffect } from "react";
import { Affix } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { animateScroll as scroll } from "react-scroll";
import { TopBtnStyled } from "./styled";

const TopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false); // 중복 방지용

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

  const handleScrollToTop = () => {
    if (disabled) return;

    setDisabled(true);

    scroll.scrollToTop({
      duration: 0,
      smooth: "smooth",
    });

    // 일정 시간 후 다시 클릭 가능
    setTimeout(() => {
      setDisabled(false);
    }, 800);
  };

  return (
    <Affix offsetBottom={20}>
      <TopBtnStyled
        shape="circle"
        icon={<UpOutlined />}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
        className={isVisible ? "visible" : ""}
        disabled={disabled}
      />
    </Affix>
  );
};

export default TopBtn;
