import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserInfo {
  nickname: string;
  email: string;
  profile_image: string;
}

const KakaoCallback = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { code, state } = router.query;

    console.log(code, state); // 추가된 로그를 통해 확인

    if (typeof code === "string") {
      fetchAccessToken(code);
    } else {
      setError("잘못된 요청입니다.");
    }
  }, [router.query]);

  const fetchAccessToken = async (code: string) => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
    const REDIRECT_URI = encodeURIComponent(
      "http://localhost:3000/auth/kakao/callback"
    );

    const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;

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
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userInfoData = await userInfoResponse.json();

      if (userInfoData.id) {
        setUserInfo({
          nickname: userInfoData.properties.nickname,
          email: userInfoData.kakao_account.email,
          profile_image: userInfoData.properties.profile_image,
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
      <h1>카카오 로그인 결과</h1>
      {error && <p>{error}</p>}
      {userInfo ? (
        <div>
          <p>사용자 이름: {userInfo.nickname}</p>
          <p>사용자 이메일: {userInfo.email}</p>
          <img src={userInfo.profile_image} alt="profile" />
        </div>
      ) : (
        <p>로그인 중...</p>
      )}
    </div>
  );
};

export default KakaoCallback;
