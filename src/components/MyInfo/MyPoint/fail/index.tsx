import { useRouter } from "next/router";
import React from "react";
import { PaymentFailStyled } from "./styled";
import { Button, Result } from "antd";

const PaymentFail = () => {
  const router = useRouter();

  return (
    <PaymentFailStyled className="main-wrap-errer">
      <Result
        status="error"
        title="결제에 실패했습니다"
        subTitle="문제가 발생했어요. 다시 시도해 주세요."
        extra={[
          <Button
            type="primary"
            key="myPage"
            onClick={() => router.push("/myPage?menu=myInfo")}
          >
            내 계정으로 이동
          </Button>,
          <Button key="home" onClick={() => router.push("/")}>
            메인으로 이동
          </Button>,
        ]}
      />
    </PaymentFailStyled>
  );
};

export default PaymentFail;
