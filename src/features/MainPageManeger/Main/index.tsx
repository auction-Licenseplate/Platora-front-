import clsx from "clsx";
import { useRouter } from "next/router";
import { MainStyled } from "./styled";
const Main = () => {
  const router = useRouter();
  // const id:number = 2 변수 선언 예시
  return (
    <MainStyled className={clsx("main-wrap")}>
      <div className="main-container">
        <div
          onClick={() => {
            router.push("/login");
          }}
        >
          {" "}
          login
        </div>
        <div
          onClick={() => {
            router.push("/join");
          }}
        >
          join
        </div>
      </div>
    </MainStyled>
  );
};

export default Main;
