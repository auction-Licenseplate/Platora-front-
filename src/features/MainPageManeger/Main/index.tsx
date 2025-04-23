import clsx from "clsx";
import { useRouter } from "next/router";
import { MainStyled } from "./styled";
import BestProduct from "../BestProduct";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import Tier from "../Tier";
import { useEffect, useState } from "react";
import api from "@/util/intercept";
import AllProduct from "../../../components/Main/AllProduct/[type]";
import SoonProduct from "@/components/Main/SoonProduct/[type]";
import Advertising from "@/components/Advertising";

const Main = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  const type = router.query.type ? Number(router.query.type) : undefined;

  // 유저, 관리자 구분
  const [userRole, setUserRole] = useState<string | null>(null);

  // 글 작성 버튼 클릭 시
  const handleClick = async () => {
    if (!token) {
      router.push("/login");
      return;
    }
    console.log(token, "/MainPageManegement");
    try {
      const response = await axios.get(
        "http://15.164.52.122/admins/getStatus",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const ownershipStatus = response.data;

      if (ownershipStatus === "pending" || ownershipStatus === "waiting") {
        Modal.warning({
          centered: true,
          title: "공인 인증서 필요",
          content: "마이페이지에서 공인 인증서를 등록해주세요.",
          onOk: () =>
            router.push({
              pathname: "/myPage",
              query: { menu: "myInfo" },
            }),
        });
      } else {
        router.push("/write");
      }
    } catch (error) {
      console.error("Error fetching ownership status:", error);
    }
  };

  // 유저, 관리자 구분
  useEffect(() => {
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://15.164.52.122/auth/getRole", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const role = res.data;
        setUserRole(role);
      } catch (error) {
        console.error("유저 정보 요청 실패:", error);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <MainStyled className={clsx("main-wrap")}>
      {!token ? (
        <div className="paddingAd">
          <Advertising />
        </div>
      ) : (
        <></>
      )}
      {type ? (
        <Tier type={type} />
      ) : (
        <>
          {/* 관리자 홍보 */}
          <BestProduct />

          <div className="mainBoxContainer">
            {/* 곧 시작 경매 */}
            <SoonProduct />

            <SoonProduct type={0} />

            {/* 글 작성하기 */}
            {userRole === "" ? (
              <div className="wrtieBtnContainer">
                <Button className="writeBtn" onClick={handleClick}>
                  <p className="mainFont">Post Auction</p>
                </Button>
              </div>
            ) : (
              <></>
            )}

            {/* 전체 경매 */}
            <AllProduct />
          </div>
        </>
      )}
    </MainStyled>
  );
};

export default Main;
