import WriteContainer from "@/features/WritePage/Write";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WritePage = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <WriteContainer />;
};

export default WritePage;
