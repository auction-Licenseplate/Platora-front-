import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const router = useRouter();
  const { amount, userId } = router.query;

  const handlePaymentSuccess = async (
    userId: string,
    amount: number,
    method: string
  ) => {
    try {
      // payment 테이블 -> userId(토큰이라서 검증이 필요)에 따라 amount 저장
      await axios.post(
        "http://localhost:5000/pay/save",
        {
          payment_method: method,
          amount,
          status: "success",
        },
        {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

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
    const userId = query.get("userId");
    const method = "카드";

    if (userId && amount && method) {
      handlePaymentSuccess(userId, parseInt(amount), method);
    }
  }, []);

  return <p>결제 처리 중입니다...</p>;
};

export default PaymentSuccess;
