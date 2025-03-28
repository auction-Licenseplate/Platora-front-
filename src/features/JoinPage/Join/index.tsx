import { JoinStyled } from "./styled";
import JoinForm from "./JoinForm";
import { useState } from "react";

const Join = () => {
  const [agree, setAgree] = useState(false);
  return (
    <JoinStyled>
      <h2>회원가입</h2>
      <JoinForm />
    </JoinStyled>
  );
};

export default Join;
