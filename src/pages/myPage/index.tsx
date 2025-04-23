import MyPageContainer from "@/features/MyPageManeger/MyPage";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { Modal } from "antd";
import dynamic from "next/dynamic";

const MyPage = () => {
  const router = useRouter();
  const isModalShown = useRef(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log("mypage window:", window);
    if (typeof window !== "undefined") {
      const t = Cookie.get("accessToken");
      setToken(t);
      console.log("mypage token", t);
    }
  }, []);

  console.log("mypage 토큰 : ", token);

  // useEffect(() => {
  //   if (token === undefined) {
  //     isModalShown.current = true;
  //     Modal.warning({
  //       centered: true,
  //       title: "로그인 ",
  //       content: "로그인 후 다시 시도해주세요.",
  //       onOk: () => {
  //         router.push("/login");
  //       },
  //     });
  //   }
  // }, [token]);

  return <MyPageContainer />;
};

export default dynamic(() => Promise.resolve(MyPage), { ssr: false });
