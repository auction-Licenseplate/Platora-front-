import { useEffect, useState } from "react";
import { DetailStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface detailprops {
  id: string | undefined;
}
const DetailPage = ({ id }: detailprops) => {
  const [arr, setArr] = useState([]);
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (token === null) return;
    if (!token) {
      router.push("/login");
      return; // 리퀘스트 보내지 않도록 조기 종료
    }
    axios.post("http://localhost:5000/boards/detail", { id }).then((res) => {
      console.log(res.data);
      const data = [
        {
          carnumber: res.data.au_aution_num,
          endtime: res.data.au_end_time,
          price: res.data.au_final_price,
          name: res.data.bidUser_name,
        },
      ];
      setArr(res.data);
      // 필요한 정보
      //현재가, 끝나는 날짜, 경매번호, 입찰 기록 , 사진 3장 다 , 물품 설명 , 물품 등록자이름
    });
  }, [id, token, router]);

  return (
    <>
      <div>오늘 왜 이렇게 잠이 오지</div>
    </>
  );
};

export default DetailPage;
