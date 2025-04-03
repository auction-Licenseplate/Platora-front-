import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PlusInfo from "@/features/PlusInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@/store/userSlice";
import { RootState } from "@/store/store";
interface SocialCallbackProps {
  type: string;
}

const SocialCallback = ({ type }: SocialCallbackProps) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(true);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.userToken);
  useEffect(() => {
    if (!router.isReady) return; // router.query가 준비될 때까지 대기

    const { code } = router.query;
    if (typeof code === "string") {
      login(code);
    } else {
      console.log("잘못된 요청입니다.");
    }
  }, [router.isReady, router.query]);

  const login = (code: string) => {
    try {
      axios
        .post(
          `http://localhost:5000/auth/login/${type}`,
          { code },
          { withCredentials: true }
        )
        .then((res) => {
          if (typeof res.data.user === "number") {
            console.log("로그인 실패, user가 없습니다.");
            setUser(res.data.user);
            setIsSuccess(false); // 로그인 실패 상태
          } else {
            setIsSuccess(true); // 로그인 성공 상태
            dispatch(setUserToken(res.data.token));
            router.push("/");
          }
        });
    } catch (error) {
      console.error("로그인 실패:", error);
      setIsSuccess(false); // 로그인 실패 상태
    }
  };

  if (!isSuccess) {
    return <PlusInfo userid={user} />; // 로그인 실패 시 PlusInfo 컴포넌트 렌더링
  }

  return <div style={{ width: 1000, height: 1000 }}></div>; // 로딩 중 화면 표시
};

export default SocialCallback;
