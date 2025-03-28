import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store"; // store.ts에서 가져옴
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
