import DetailPage from "@/features/DetailPage";
import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === "string" ? id : undefined;
  console.log(stringId);
  return <DetailPage id={stringId} />;
};

export default Detail;
