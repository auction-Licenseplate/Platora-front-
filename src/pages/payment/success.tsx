import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { myInfo } from "@/util/useMyInfo";
interface Props {
  info: string;
}

const PaymentSuccess = ({ info }: Props) => {
  const router = useRouter();
  const { paymentKey, amount } = router.query;

  const { setRefundTableData } = myInfo(info);

  const token = useSelector((state: RootState) => state.user.userToken);

  const handlePaymentSuccess = async (amount: number, method: string) => {
    try {
      // payment 테이블 -> userId(토큰이라서 검증이 필요)에 따라 amount 저장
      const response = await axios.post(
        "http://localhost:5000/pay/save",
        {
          payment_method: method,
          amount,
          status: "success",
          paymentKey,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
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
    const method = "카드";

    if (amount && method) {
      handlePaymentSuccess(parseInt(amount), method);
    }
  }, []);

  return <p>결제 처리 중입니다...</p>;
};

export default PaymentSuccess;
