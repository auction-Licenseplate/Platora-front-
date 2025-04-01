import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PlusInfo from "@/features/PlusInfo";

interface SocialCallbackProps {
  type: string;
}

const SocialCallback = ({ type }: SocialCallbackProps) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState("");

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
          console.log("응답 데이터:", res);

          // 조건 수정
          if (typeof res.data.user === "number") {
            // user가 undefined, null, 또는 falsy 값인 경우
            console.log("로그인 실패, user가 없습니다.");
            setUser(res.data.user);
            setIsSuccess(false); // 로그인 실패 상태
          } else {
            setIsSuccess(true); // 로그인 성공 상태
            router.push("/");
          }
        });
    } catch (error) {
      console.error("로그인 실패:", error);
      setIsSuccess(false); // 로그인 실패 상태
    }
  };

  if (!isSuccess) {
    return <PlusInfo userid={user} />; // 로그인 성공 시 PlusInfo 컴포넌트 렌더링
  }

  return <div>로딩 중...</div>; // 로딩 중 화면 표시
};

export default SocialCallback;
