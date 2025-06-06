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
    const t = Cookie.get("accessToken");
    setToken(t);

    if (!t && !isModalShown.current) {
      isModalShown.current = true;
      Modal.warning({
        centered: true,
        title: "로그인 ",
        content: "로그인 후 다시 시도해주세요.",
        onOk: () => {
          router.push("/login");
        },
      });
    }
  }, []);

  return <MyPageContainer />;
};

export default dynamic(() => Promise.resolve(MyPage), { ssr: false });
