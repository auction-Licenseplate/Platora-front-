import clsx from "clsx";
import { useRouter } from "next/router";
import { FooterStyled } from "./styled";
import Image from "next/image";

// 이미지
import logo from "@/assets/images/Logo_plotora(white).png";
import facebook from "@/assets/images/facebookIcon.png";
import twitter from "@/assets/images/twitterIcon.png";
import instagram from "@/assets/images/instagramIcon.png";

const Main = () => {
  const router = useRouter();
  // const id:number = 2 변수 선언 예시
  return (
    <FooterStyled className={clsx("main-wrap")}>
      <div className="main-container">
        <div className="logoAinfo">
          <Image src={logo} alt="platora logo image" width={200} height={40} />
          <div className="textsInfo">
            <p> 대표이사: 김예지 </p>
            <p> 전화번호 : 010-1234-4567 </p>
            <p> 사업자등록번호: 123-45-67890 </p>
            <p> 서울특별시 강남구 테헤란로 123 </p>
            <p> © 2025 (주) platora. All Rights Reserved. </p>
          </div>
        </div>
        <div className="social-icons">
          <Image
            src={facebook}
            alt="Facebook"
            onClick={() => {
              router.push("https://www.facebook.com/?locale=ko_KR");
            }}
            width={30}
            height={30}
            style={{ cursor: "pointer" }}
          />
          <Image
            src={twitter}
            alt="Twitter"
            onClick={() => {
              router.push("https://x.com/?lang=ko");
            }}
            width={30}
            height={30}
            style={{ cursor: "pointer" }}
          />
          <Image
            src={instagram}
            alt="Instagram"
            onClick={() => {
              router.push("https://www.instagram.com/");
            }}
            width={30}
            height={30}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </FooterStyled>
  );
};

export default Main;
