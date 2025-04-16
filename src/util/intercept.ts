import { Modal } from "antd";
import axios from "axios";

const api = axios.create({});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Modal.warning({
        centered: true,
        title: "로그인",
        content: "로그인 후 다시 시도해주세요.",
        onOk: () => {
          // useRouter() 대신 window.location 사용
          window.location.href = "/login";
        },
      });
    }

    return Promise.reject(error);
  }
);

export default api;
