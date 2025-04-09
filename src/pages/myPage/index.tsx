import MyPageContainer from "@/features/MyPageManeger/MyPage";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

const MyPage = () => {
  const router = useRouter();
  const token = Cookie.get("accessToken");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return <MyPageContainer />;
};

export default MyPage;
