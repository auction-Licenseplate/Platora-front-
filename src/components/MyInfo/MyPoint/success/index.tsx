import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { myInfo } from "@/util/useMyInfo";
import { Button, Result } from "antd";
import { PaymentSuccessStyled } from "./styled";

interface Props {
  info: string;
}

const PaymentSuccess = ({ info }: Props) => {
  const router = useRouter();
  const { paymentKey } = router.query;
  const [success, setSuccess] = useState(false);

  // const { setRefundTableData, setUserInfo } = myInfo(info);

  const [amount, setAmount] = useState<number | null>(null);

  const token = useSelector((state: RootState) => state.user.userToken);

  const handlePaymentSuccess = async (amount: number, method: string) => {
    try {
      await axios.post(
        "http://15.164.52.122/pay/save",
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
      setSuccess(true);
    } catch (error) {
      console.error("결제 정보 저장 실패:", error);
      alert("결제 정보 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const amountStr = query.get("amount");
    const method = "카드";

    if (amountStr && method) {
      const parsedAmount = parseInt(amountStr);
      setAmount(parsedAmount);
      handlePaymentSuccess(parsedAmount, method);
    }
  }, []);

  return (
    <PaymentSuccessStyled className="main-wrap-success">
      {success ? (
        <Result
          status="success"
          title={
            <span className="payment-title">
              결제가 성공적으로 완료되었습니다!
            </span>
          }
          subTitle={
            <span className="payment-title">
              <br /> 결제 금액: {amount?.toLocaleString()}원 <br /> <br /> 결제
              수단: 카드
            </span>
          }
          extra={[
            <Button
              type="primary"
              key="myPage"
              onClick={() => router.push("/myPage?menu=myInfo")}
            >
              마이페이지로 이동
            </Button>,
            <Button key="home" onClick={() => router.push("/")}>
              홈으로 돌아가기
            </Button>,
          ]}
        />
      ) : (
        <p>결제 처리 중입니다...</p>
      )}
    </PaymentSuccessStyled>
  );
};

export default PaymentSuccess;
