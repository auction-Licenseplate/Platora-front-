import FindPage from "@/features/FindPage";
import { Router, useRouter } from "next/router";

const Find = () => {
  const router = useRouter();
  const { type } = router.query;
  return <FindPage type={typeof type === "string" ? type : ""} />;
};

export default Find;
