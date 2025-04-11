import { use, useEffect, useState } from "react";
import { DetailStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Button, Input, Modal } from "antd";
import Cookie from "js-cookie";
import fullheart from "@/assets/images/fullheart.png";
import heart from "@/assets/images/heart.png";
import Profile from "./ProfileDetail";
import ListDetail from "./ListDetail";
import clsx from "clsx";
interface detailprops {
  id: string | undefined;
}
interface DetailData {
  id: number;
  userId: string;
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
  const [heartimg, setHeartimg] = useState<any>("");
  const [sellerOpen, setSellerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userpoint, setUserpoint] = useState(0);
  const [preUser, setPreUser] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [listopen, setListopen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const token = Cookie.get("accessToken");

  useEffect(() => {
    if (!token) {
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
        console.log(res.data);
        const lastData = {
          lastPrice: res.data.lastBid.bid_price, //최근 결제 가격
          lastUser: res.data.lastBid.bidUser_Id, // 최근 결제 아이디
        };

        const raw = res.data.data[0];
        const imgs = raw.vehicle_car_img.split(",");

        const data = [
          {
            id: raw.au_id,
            userId: raw.registerUser_id, //등록한 사람의 아이디
            carnumber: raw.vehicle_plate_num,
            itemnumber: raw.au_auction_num,
            endtime: raw.au_end_time,
            price: raw.au_final_price,
            name: raw.bidUser_name,
            count: raw.bid_bid_count,
            carimg1: imgs[0] || "",
            carimg2: imgs[1] || "",
            carimg3: imgs[2] || "",
            carinfo: raw.vehicle_car_info,
            priceunit: raw.grade_price_unit,
          },
        ];
        setArr(data);
        setImg(data[0].carimg1);
        setPrice(data[0].price);
        res.data.isFavorite === true
          ? setHeartimg(fullheart)
          : setHeartimg(heart);
        setUserpoint(res.data.lastBid.currentUserPoint);
        setPreUser(lastData);
        setList(res.data.data);
        setUserId(res.data.currentUserId); // 로그인 한 사람의 유저 아이디
      });
  }, [id, token, router]);
  useEffect(() => {}, [listopen]);
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
    if (userId === arr[0].userId)
      if (price <= preUser.lastPrice) {
        Modal.warning({
          centered: true,
          title: "현재가 보다 낮은 금액으로 입찰 할 수 없습니다.",
        });
        return;
      }
    if (price > userpoint) {
      Modal.warning({
        centered: true,
        title: "포인트 충전 후 이용해주세요.",
        onOk: () => {
          router.push({
            pathname: "/myPage",
            query: { menu: "myInfo" },
          });
        },
      });
      return;
    }
    axios
      .post("http://localhost:5000/boards/priceupdate", {
        id: arr[0].id,
        userId: userId,
        price,
        prePrice: preUser.lastPrice,
        preUserId: preUser.lastUser,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  // 좋아요 상태 업데이트
  const likePost = () => {
    axios
      .post("http://localhost:5000/boards/likepost", {
        id: arr[0].id,
        userId: arr[0].userId,
      })
      .then((res) => {
        console.log(res.data);
        res.data.status === true ? setHeartimg(fullheart) : setHeartimg(heart);
      });
  };

  return arr.length === 0 ? (
    <div>로딩 중...</div>
  ) : (
    <DetailStyled className={clsx("detailstyled")}>
      <div className="detail-wrap">
        <div className="detail-title">{arr[0].carnumber}</div>
        <hr />
        <br></br>
        <div className="detail-container">
          <div className="detail-imgcontainer">
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
          <div className="detail-textcontainer">
            <div className="detail-price">
              <span>현재가</span>
              <span className="detail-bigprice">
                {arr[0].price.toLocaleString()}원
              </span>
            </div>
            <div className="detail-minibox">
              <div className="detail-textdiv">
                <span className="detail-texttitle">경매번호</span>
                <span>{arr[0].itemnumber}</span>
              </div>
              <div className="detail-textdiv">
                <span className="detail-texttitle">남은 시간</span>
                <span className="detail-thicktext">
                  {getRemainingTime(arr[0].endtime)}
                </span>
              </div>
              <div className="detail-textdiv">
                <span className="detail-texttitle">입찰 횟수</span>
                <span>
                  {arr[0].count}18
                  <span
                    onClick={() => {
                      setListopen(true);
                    }}
                  >
                    기록 보기
                  </span>
                </span>
              </div>
              <div className="detail-textdiv">
                <span className="detail-texttitle">판매자</span>
                <span
                  onClick={() => {
                    setSelectedUserId(arr[0].userId);
                    setSellerOpen(true);
                  }}
                >
                  {arr[0].name}
                </span>
              </div>
              <hr></hr>
              <div className="detail-textdiv">
                <span className="detail-texttitle">입찰 단위</span>
                <span>{arr[0].priceunit}</span>
              </div>
              <div className="detail-textdiv">
                <span className="detail-texttitle">희망 입찰가</span>
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
              <div className="detail-textdiv">
                <span className="detail-pricespan">
                  <span className="detail-texttitle">예상 입찰가</span>
                  <span className="detail-thicktext">
                    {(price + price * 0.1).toLocaleString()}
                  </span>
                  <div>
                    (물품 가격: {price.toLocaleString()} + 경매 수수료{" "}
                    {(price * 0.1).toLocaleString()})
                  </div>
                </span>
              </div>
              <div>
                <Button onClick={updatePrice}>입찰하기</Button>
                <Image onClick={likePost} src={heartimg} alt="" />
              </div>
            </div>
          </div>

          <Profile
            open={sellerOpen}
            onClose={() => setSellerOpen(false)}
            name={arr[0].name}
            userId={arr[0].userId}
          />

          <ListDetail
            setListopen={setListopen}
            list={list}
            listopen={listopen}
          />
        </div>
      </div>
    </DetailStyled>
  );
};

export default DetailPage;
