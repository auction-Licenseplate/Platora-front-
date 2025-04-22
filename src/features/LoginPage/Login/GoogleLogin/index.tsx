import Image from "next/image";
import GoogleLoginImg from "@/assets/images/googlLogin.jpeg";
import { Modal } from "antd";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email`;

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    Modal.warning({
      centered: true,
      title: "준비중입니다.",
    });
  };

  return (
    <Image
      className="loginform-socialbtn"
      src={GoogleLoginImg}
      onClick={handleGoogleLogin}
      width={100}
      height={100}
      alt="googlelogin"
    />
  );
};

export default GoogleLogin;
