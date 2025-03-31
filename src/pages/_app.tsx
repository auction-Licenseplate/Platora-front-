import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { setUserToken } from "@/store/userSlice";
import axios from "axios";

// 토큰을 가져오는 컴포넌트
const TokenLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/tokenCheck", { withCredentials: true })
      .then((res) => {
        console.log("토큰", res.data);
        if (res.data.token) {
          dispatch(setUserToken(res.data.token));
        }
      })
      .catch((error) => {
        console.error("로그인 상태 확인 실패:", error);
      });
  }, [dispatch]);

  return null;
};

// 최상위 App 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TokenLoader />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
