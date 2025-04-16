import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../store/store";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { setUserToken } from "@/store/userSlice";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "antd/dist/antd.css";

import LoadingSpinner from "@/components/Loading";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let startTime = 0;
    let timeout: NodeJS.Timeout | null = null;

    const start = () => {
      startTime = Date.now();
      setLoading(true);
    };

    const end = () => {
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;

      if (remaining > 0) {
        timeout = setTimeout(() => {
          setLoading(false);
        }, remaining);
      } else {
        setLoading(false);
      }
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      if (timeout) clearTimeout(timeout);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>PLATORA</title>
      </Head>
      <Provider store={store}>
        <TokenLoader />
        <Header />
        {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
        <Footer />
      </Provider>
    </>
  );
}
