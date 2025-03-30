import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Join from "@/features/JoinPage/Join";
import axios from "axios";
const NaverCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (typeof code === "string") {
      console.log(code);
      login(code);
    } else {
      console.log("잘못된 요청입니다.");
    }
  }, [router.query]);
  const login = (code: string) => {
    axios
      .post("http://localhost:5000/auth/login/naver", code) // 서버 URL
      .then((res) => {
        if (res.data) {
          return <Join />;
        } else {
          console.log("로그인 성공", res.data);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("로그인 실패 :", error);
      });
  };
};

export default NaverCallback;
