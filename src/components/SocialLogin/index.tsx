import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PlusInfo from "@/features/PlusInfo";

interface SocialCallbackProps {
  type: string; // code는 string 타입으로 지정
}

const SocialCallback = ({ type }: SocialCallbackProps) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false); // 로그인 성공 여부 상태

  useEffect(() => {
    const { code } = router.query;
    if (typeof code === "string") {
      console.log("Received code:", code);
      login(code); // code 전달
    } else {
      console.log("잘못된 요청입니다.");
    }
  }, [router.query]);

  const login = (code: string) => {
    axios
      .post(
        `http://localhost:5000/auth/login/${type}`,
        { code },
        { withCredentials: true }
      ) // 서버 URL
      .then((res) => {
        if ((res.data.message = "200 유저정보없음")) {
          setIsSuccess(false); // 로그인 성공 시 상태 업데이트
        } else {
          setIsSuccess(true);
          router.push("/"); // 로그인 실패 시 홈으로 리디렉션
        }
      })
      .catch((error) => {
        console.error("로그인 실패 :", error);
      });
  };

  if (!isSuccess) {
    return <PlusInfo />; // 로그인 성공 시 Join 컴포넌트를 렌더링
  }

  return <div>로딩 중...</div>; // 로딩 중 화면 표시
};

export default SocialCallback;
