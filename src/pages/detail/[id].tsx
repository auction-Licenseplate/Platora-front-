import DetailPage from "@/features/DetailPage";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Detail = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);
  const { id } = router.query;
  const stringId = typeof id === "string" ? id : undefined;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <DetailPage id={stringId} />;
};

export default Detail;
