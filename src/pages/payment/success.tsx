import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const router = useRouter();
  const { orderId, amount, userId } = router.query;

  const handlePaymentSuccess = async (
    orderId: string,
    userId: string,
    auctionId: string,
    amount: number,
    method: string
  ) => {
    try {
      await axios.post("http://localhost:5000/payments/save", {
        orderId,
        user_id: userId,
        auction_id: auctionId,
        payment_method: method,
        amount,
        status: "success",
      });

      alert("결제가 완료되었습니다.");
      router.push("/myPage?menu=myInfo");
    } catch (error) {
      console.error("결제 정보 저장 실패:", error);
      alert("결제 정보 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const amount = query.get("amount");
    const orderId = query.get("orderId");
    const userId = query.get("userId");
    const auctionId = query.get("auctionId");

    const method = query.get("method");

    if (orderId && userId && auctionId && amount && method) {
      handlePaymentSuccess(
        orderId,
        userId,
        auctionId,
        parseInt(amount),
        method
      );
    }
  }, []);

  return <p>결제 처리 중입니다...</p>;
};

export default PaymentSuccess;
