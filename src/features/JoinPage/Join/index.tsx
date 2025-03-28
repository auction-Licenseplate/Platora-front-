import { JoinStyled } from "./styled";
import JoinForm from "./JoinForm";
import { useState } from "react";
import JoinAgree from "./JoinAgree";
const Join = () => {
  const [agree, setAgree] = useState<boolean>(false);

  return (
    <JoinStyled>
      <div className="join-text">회원가입</div>
      {agree === false ? (
        <JoinAgree agree={agree} setAgree={setAgree} />
      ) : (
        <JoinForm />
      )}
    </JoinStyled>
  );
};

export default Join;
