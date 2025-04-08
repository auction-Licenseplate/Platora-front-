import { useEffect } from "react";
import { DetailStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface detailprops {
  id: string;
}
const DetailPage = ({ id }: detailprops) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);
  useEffect(() => {
    if (token === null) {
      return;
    }

    console.log(id);
    axios.post("http://localhost:5000/boards/detail", { id }).then((res) => {
      console.log(res.data);

      // 필요한 정보
      //현재가, 끝나는 날짜, 경매번호, 입찰 기록 , 사진 3장 다 , 물품 설명 , 물품 등록자이름
    });
  }, []);
  return (
    <>
      <div>오늘 왜 이렇게 잠이 오지</div>
    </>
  );
};

export default DetailPage;
