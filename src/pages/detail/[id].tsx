import DetailPage from "@/features/DetailPage";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

const Detail = () => {
  const router = useRouter();
  const token = Cookie.get("accessToken");
  const { id } = router.query;
  const stringId = typeof id === "string" ? id : undefined;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return <DetailPage id={stringId} />;
};

export default Detail;
