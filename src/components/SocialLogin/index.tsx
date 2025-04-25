import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PlusInfo from "@/features/PlusInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@/store/userSlice";
import { RootState } from "@/store/store";
import Cookie from "js-cookie";
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
    }
  }, [router.isReady, router.query]);

  const login = async (code: string) => {
    try {
      const res = await axios.post(
        `http://15.164.52.122/auth/login/${type}`,
        { code },
        { withCredentials: true }
      );

      if (typeof res.data.user === "number") {
        if (type === "naver") {
          router.push("/login");
        }
        setUser(res.data.user);
        setIsSuccess(false); // 로그인 실패 상태
      } else {
        setIsSuccess(true); // 로그인 성공 상태
        dispatch(setUserToken(res.data.token.accessToken));
        Cookie.set("accessToken", res.data.token.accessToken, {
          path: "/",
          expires: 1,
        });
        Cookie.set("refreshToken", res.data.token.refreshToken, {
          path: "/",
          expires: 7,
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setIsSuccess(false);
      router.push("/"); // 여기까지 오게 됨
    }
  };

  if (!isSuccess) {
    return <PlusInfo userid={user} />; // 로그인 실패 시 PlusInfo 컴포넌트 렌더링
  }

  return <div style={{ width: 1000, height: 1000 }}></div>; // 로딩 중 화면 표시
};

export default SocialCallback;
