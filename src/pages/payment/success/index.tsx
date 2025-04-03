import PaymentSuccess from "@/components/MyInfo/MyPoint/success";
import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();
  const amount = Array.isArray(router.query.amount)
    ? router.query.amount[0]
    : router.query.amount || "";

  return <PaymentSuccess info={amount} />;
};

export default SuccessPage;
