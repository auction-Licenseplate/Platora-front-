import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

const GoogleCallback = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { code } = router.query;

    if (typeof code === "string") {
      fetchAccessToken(code);
    } else {
      setError("잘못된 요청입니다.");
    }
  }, [router.query]);

  const fetchAccessToken = async (code: string) => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = encodeURIComponent(
      "http://localhost:3000/auth/google/callback"
    );

    const tokenUrl = `https://oauth2.googleapis.com/token`;

    const body = new URLSearchParams();
    body.append("code", code);
    // body.append("client_id", GOOGLE_CLIENT_ID);
    // body.append("client_secret", GOOGLE_CLIENT_SECRET);
    body.append("redirect_uri", REDIRECT_URI);
    body.append("grant_type", "authorization_code");

    body.append("redirect_uri", REDIRECT_URI);
    body.append("grant_type", "authorization_code");

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        body: body,
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
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userInfoData = await userInfoResponse.json();

      if (userInfoData.sub) {
        setUserInfo({
          name: userInfoData.name,
          email: userInfoData.email,
          picture: userInfoData.picture,
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
      <h1>구글 로그인 결과</h1>
      {error && <p>{error}</p>}
      {userInfo ? (
        <div>
          <p>사용자 이름: {userInfo.name}</p>
          <p>사용자 이메일: {userInfo.email}</p>
          <img src={userInfo.picture} alt="profile" />
        </div>
      ) : (
        <p>로그인 중...</p>
      )}
    </div>
  );
};

export default GoogleCallback;
