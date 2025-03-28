import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserInfo {
  name: string;
  email: string;
  profile_image: string;
}

const NaverCallback = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // userInfo를 초기화할 때 null로 설정
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { code, state } = router.query;

    if (typeof code === "string") {
      fetchAccessToken(code);
    } else {
      setError("잘못된 요청입니다.");
    }
  }, [router.query]);

  const fetchAccessToken = async (code: string) => {
    const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
    const REDIRECT_URI = encodeURIComponent(
      "http://localhost:3000/auth/naver/callback"
    );

    const tokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=naver&redirect_uri=${REDIRECT_URI}`;

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();

      if (data.access_token) {
        fetchUserInfo(data.access_token);
      } else {
        setError("액세스 토큰을 받는 데 실패했습니다.");
      }
    } catch (err) {
      setError("에러가 발생했습니다.");
    }
  };

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const userInfoResponse = await fetch(
        "https://openapi.naver.com/v1/nid/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userInfoData = await userInfoResponse.json();

      if (userInfoData.resultcode === "00") {
        const response = userInfoData.response;
        setUserInfo({
          name: response.name,
          email: response.email,
          profile_image: response.profile_image,
        });
      } else {
        setError("사용자 정보를 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      setError("에러가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>네이버 로그인 결과</h1>
      {error && <p>{error}</p>}
      {userInfo ? (
        <div>
          <p>사용자 이름: {userInfo.name}</p>
          <p>사용자 이메일: {userInfo.email}</p>
          <img src={userInfo.profile_image} alt="profile" />
        </div>
      ) : (
        <p>로그인 중...</p>
      )}
    </div>
  );
};

export default NaverCallback;
