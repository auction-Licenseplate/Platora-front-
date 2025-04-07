import DetailPage from "@/features/DetailPage";
import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  return <DetailPage id={id} />;
};
