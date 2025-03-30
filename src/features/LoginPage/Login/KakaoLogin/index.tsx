import Image from "next/image";
import KakoLoginImg from "@/assets/images/kakaoLogin.png";
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=kakao`;

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 화면으로 이동
  };

  return (
    <Image
      className="loginform-socialbtn"
      src={KakoLoginImg}
      onClick={handleKakaoLogin}
      alt="Kakaologin"
    />
  );
};

export default KakaoLogin;
