const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=naver`;

const NaverLogin = () => {
  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL; // 네이버 로그인 화면으로 이동
  };

  return <button onClick={handleNaverLogin}>네이버 로그인</button>;
};

export default NaverLogin;
