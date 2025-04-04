import { JoinStyled } from "./styled";
import JoinForm from "./JoinForm";
import { useEffect, useState } from "react";
import JoinAgree from "./JoinAgree";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
const Join = () => {
  const [agree, setAgree] = useState<boolean>(false);
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

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
