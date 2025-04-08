import { useEffect, useState } from "react";
import { DetailStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Button, Input } from "antd";
interface detailprops {
  id: string | undefined;
}
interface DetailData {
  id: number;
  carnumber: string;
  itemnumber: string;
  endtime: string;
  price: number;
  name: string;
  count: number;
  carimg1: string;
  carimg2: string;
  carimg3: string;
  carinfo: string;
  priceunit: number;
}

const DetailPage = ({ id }: detailprops) => {
  const [price, setPrice] = useState<number>(0);
  const [arr, setArr] = useState<DetailData[]>([]);
  const [remainTime, setRemainTime] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (!token) return;
    if (token === "") {
      router.push("/login");
      return;
    }

    axios
      .post(
        "http://localhost:5000/boards/detail",
        { id }, // 요청 바디
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!res.data.data || res.data.data.length === 0) {
          return;
        }

        const raw = res.data.data[0];
        const imgs = raw.vehicle_car_img.split(",");

        const data = [
          {
            id: raw.au_id,
            carnumber: raw.vehicle_plate_num,
            itemnumber: raw.au_auction_num,
            endtime: raw.au_end_time,
            price: raw.au_final_price,
            name: raw.bidUser_name,
            count: raw.bid_bid_count,
            carimg1: imgs[0],
            carimg2: imgs[1],
            carimg3: imgs[2],
            carinfo: raw.vehicle_car_info,
            priceunit: raw.grade_price_unit,
          },
        ];
        setArr(data);
        setImg(data[0].carimg1);
        setPrice(data[0].price);
      });
  }, [id, token, router]);
  useEffect(() => {
    if (arr.length === 0) return;

    const updateTime = () => {
      const remain = getRemainingTime(arr[0].endtime);
      setRemainTime(remain);
    };

    updateTime(); // 초기 1회 실행
    const interval = setInterval(updateTime, 60000); // 1분마다 갱신

    return () => clearInterval(interval); // 언마운트 시 인터벌 제거
  }, [arr]);
  const priceChange = (type: string) => {
    if (type === "+") {
      setPrice(price + arr[0].priceunit);
    }

    if (type === "-") {
      const nextPrice = Number(price) - arr[0].priceunit;
      if (nextPrice >= arr[0].price) {
        setPrice(nextPrice);
      }
    }
  };

  const getRemainingTime = (endTime: string): string => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      return "경매 종료";
    }

    const diffMinutes = Math.floor(diff / (1000 * 60));
    const days = Math.floor(diffMinutes / (60 * 24));
    const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
    const minutes = diffMinutes % 60;

    return `${days}일 ${hours}시간 ${minutes}분 남음`;
  };
  // 입찰가 갱신 요청
  const updatePrice = () => {
    axios
      .post("http://localhost:5000/boards/priceupdate", {
        id: arr[0].id,
        price,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return arr.length === 0 ? (
    <div>로딩 중...</div>
  ) : (
    <DetailStyled>
      <div>
        <div>{arr[0].carnumber}</div>
        <hr />
        <div>
          <div>
            <div>
              <Image
                src={`http://localhost:5000/uploads//${img}`}
                width={300}
                height={300}
                alt=""
              />
            </div>
            <div>
              <Image
                src={`http://localhost:5000/uploads//${arr[0].carimg1}`}
                width={100}
                height={100}
                alt=""
                onClick={() => setImg(arr[0].carimg1)}
              />
              <Image
                src={`http://localhost:5000/uploads//${arr[0].carimg2}`}
                width={100}
                height={100}
                alt=""
                onClick={() => setImg(arr[0].carimg2)}
              />
              <Image
                src={`http://localhost:5000/uploads//${arr[0].carimg3}`}
                width={100}
                height={100}
                alt=""
                onClick={() => setImg(arr[0].carimg3)}
              />
            </div>
          </div>
          <div>
            <div>현재가 : {arr[0].price.toLocaleString()}</div>
            <div>경매번호 : {arr[0].itemnumber}</div>
            <div>남은 시간 : {getRemainingTime(arr[0].endtime)}</div>
            <div>입찰 횟수 : {arr[0].count}</div>
            <div>판매자 : {arr[0].name}</div>
            <hr></hr>
            <div>입찰 단위 : {arr[0].priceunit}</div>
            <div>
              희망 입찰가 :
              <div>
                <span
                  onClick={() => {
                    priceChange("-");
                  }}
                >
                  -
                </span>
                <Input
                  type="Number"
                  style={{ width: 100 }}
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                />
                <span
                  onClick={() => {
                    priceChange("+");
                  }}
                >
                  +
                </span>
              </div>
            </div>
            <div>
              예상 입찰가 : {(price + price * 0.1).toLocaleString()}
              <div>
                (물품 가격: {price.toLocaleString()} + 경매 수수료{" "}
                {(price * 0.1).toLocaleString()})
              </div>
            </div>
            <div>
              <Button onClick={updatePrice}>입찰하기</Button>
              <Button>관심 물품</Button>
            </div>
          </div>
        </div>
      </div>
    </DetailStyled>
  );
};

export default DetailPage;
