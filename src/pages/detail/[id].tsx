import DetailPage from "@/features/DetailPage";
import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  return <DetailPage id={typeof id === "number" ? id : ""} />;
};

export default Detail;
