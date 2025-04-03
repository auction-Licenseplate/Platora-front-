import { useRouter } from "next/router";
import React from "react";
import { PaymentFailStyled } from "./styled";
import clsx from "clsx";

const PaymentFail = () => {
  const router = useRouter();

  return (
    <PaymentFailStyled className={clsx("main-wrap")}>
      <h1>결제 실패</h1>
      <p>결제가 실패했습니다. 다시 시도해주세요.</p>
      <button
        onClick={() => {
          router.push("/myPage?menu=myInfo");
        }}
      >
        내 계정으로 이동
      </button>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        메인으로 이동
      </button>
    </PaymentFailStyled>
  );
};

export default PaymentFail;
