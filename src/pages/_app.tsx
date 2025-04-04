import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../store/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { setUserToken } from "@/store/userSlice";
import axios from "axios";

// 토큰을 가져오는 컴포넌트
const TokenLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = document.cookie;
    const accessToken = token
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken) {
      dispatch(setUserToken(accessToken));
    }
  }, [dispatch]);
  return null;
};
// 최상위 App 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  // 타입 별 메인 컴포넌트 변경
  return (
    <Provider store={store}>
      <TokenLoader />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
