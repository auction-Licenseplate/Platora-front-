import MyPageContainer from "@/features/MyPageManeger/MyPage";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { Modal } from "antd";

const MyPage = () => {
  const router = useRouter();
  const token = Cookie.get("accessToken");
  console.log(token, "111111111");
  const isModalShown = useRef(false);

  useEffect(() => {
    if (!token && !isModalShown.current) {
      isModalShown.current = true;

      // Modal.warning({
      //   centered: true,
      //   title: "로그인 ",
      //   content: "로그인 후 다시 시도해주세요.",
      //   onOk: () => {
      //     router.push("/login");
      //   },
      // });
    }
  }, [token]);

  return <MyPageContainer />;
};

export default MyPage;
