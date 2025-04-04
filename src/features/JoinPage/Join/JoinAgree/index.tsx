import axios from "axios";
import { JoinAgreeStyled } from "./styled";
import { Checkbox } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// setAgree의 타입을 React.Dispatch<React.SetStateAction<boolean>>로 명시
const JoinAgree = ({ agree, setAgree }: { agree: boolean; setAgree: any }) => {
  const handleChange = (e: any) => {
    setAgree(e.target.checked); // 체크 여부를 상태로 저장
  };

  return (
    <JoinAgreeStyled>
      <Checkbox checked={agree} onChange={handleChange}>
        이용약관에 동의
      </Checkbox>
    </JoinAgreeStyled>
  );
};

export default JoinAgree;
