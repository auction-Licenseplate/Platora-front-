import clsx from "clsx";
import { useRouter } from "next/router";
import { FooterStyled } from "./styled";
import Image from "next/image";

// 이미지
import logo from "@/assets/images/Logo_plotora(white).png";

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
          <a href="https://www.facebook.com/platora" target="_blank">
            <img src="path_to_facebook_icon.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com/platora" target="_blank">
            <img src="path_to_twitter_icon.png" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/platora" target="_blank">
            <img src="path_to_instagram_icon.png" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/company/platora" target="_blank">
            <img src="path_to_linkedin_icon.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Main;
