import { AipointStyled } from "./styled";
import { Input, Button } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { myInfo } from "@/util/useMyInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
interface ScoreType {
  score: any;
  setScore: any;
  point: string | "";
  setPoint: any;
  setPayTableData: any;
  payTableData: object[];
}

const AiPoint = ({
  score,
  setScore,
  point,
  setPoint,
  payTableData,
  setPayTableData,
}: ScoreType) => {
  const [userPoint, setUsetPoint] = useState(0);

  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    let isMounted = true; //마운트 여부 체크

    axios
      .get("http://localhost:5000/users/user-info", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          setUsetPoint(res.data.point);
        }
      })
      .catch((err) => console.error("Error:", err));

    return () => {
      isMounted = false; //언마운트 시 상태 변경 방지
    };
  }, [token]);

  const prompt = `
너는 차량 번호판 등급을 평가하는 AI야.  
 반드시 앞자리 숫자 뒷자리 숫자 둘다 포함해서 4가 3개 이상 들어가면 있으면 10등급이고 점수,가격도 최하점이야
📌 **번호판 등급 기준 (가장 높은 등급을 우선 적용할 것!)**
1. 앞뒤 모두 같은 숫자 (예: "11가 1111") → 1등급 (앞뒤 포커 번호이면서 같은 숫자)  
2. 앞뒤 모두 오름차순 숫자 (예: "12나 3456") → 2등급 (앞뒤 오름차순 번호)  
3. 앞뒤가 서로 다른 포커 번호 (예: "11다 2222") → 3등급 (앞뒤 다른 포커 번호)  
4. 앞자리는 내림차순, 뒷자리는 포커 (예: "32라 1111") → 4등급 (앞 내림차순 + 뒤 포커 번호)  
5. 뒷자리만 포커 번호 (예: "○○○마 1111") → 5등급 (뒷자리 포커 번호)  
6. 뒷자리만 오름차순 (예: "○○○바 1234") → 6등급 (뒷자리 오름차순 번호)  
7. "A000" 형태 번호 (예: "○○○사 1000") → 7등급 (A000 형태 번호)  
8. 의미 있는 숫자 (예: "1004", "1000", "0911", "0488") → 8등급 (특정 의미 번호)  
9. "AABB" 형태 번호 (예: "1122") → 9등급 (AABB 형태 번호)  
10. 개인이 선호하는 번호 (예: 생일, 전화번호 등) → 10등급 (개인 선호 번호) 
11.
📌 **번호판 분석 방법**
1. 번호판에서 **앞자리(숫자 2~3자리)와 뒷자리(4자리 숫자)를 분리**하라.  
   - 예: "12가 3456" → **앞자리: "12"**, **뒷자리: "3456"**  
   - 예: "341나 2345" → **앞자리: "341"**, **뒷자리: "2345"**  
   - 예: "11가 1111" → **앞자리: "11"**, **뒷자리: "1111"**  

2. **각각 오름차순/내림차순/포커 여부를 판단**하라.  
   - **오름차순**: 숫자가 작은 순서대로 증가 (예: "123", "3456")  
   - **내림차순**: 숫자가 큰 순서대로 감소 (예: "98", "7654")  
   - **포커 번호**: 모든 숫자가 같음 (예: "11", "2222")  

3. **입력된 번호판 '${point}'을 분석하여 정확한 grade , score(100점 만점) , pirce(최고 2000000에서 최저 100000 사이로 )를 계산해줘 **  


### 📌 **반드시 지킬 사항**
1. 번호판을 분석하여 **가장 높은 등급을 판별**.  
2. 아래 JSON 형식으로만 응답할 것.  
3. **다른 설명 없이 JSON 데이터만 반환**.  


 **출력 형식**
-위 등급으로 최소 10번이상의 결과값을 구한 후 제일 높은 grade score price 만 을 담아서 JSON 객체 형태 출력해줘 다른 정보는 주지마 


`;
  const handleChange = (e) => {
    setPoint(e.target.value);
  };

  const scoreCheck = () => {
    console.log(token);
    if (userPoint < 100) {
      return alert("포인트 100P가 필요한 서비스입니다.충전 후 이용해주세요");
    } else {
      axios
        .post("http://localhost:5000/openai/aichat", { message: prompt }) // 객체로 전송
        .then((res) => {
          let cleanData = res.data.replace(/```json|```/g, "").trim();

          // JSON 파싱
          const responseData = JSON.parse(cleanData);
          const scoreData = Array.isArray(responseData)
            ? responseData[0]
            : responseData;
          setScore(scoreData); // 점수 응답 저장

          // 포인트 차감 요청
          axios
            .post(
              "http://localhost:5000/pay/pointminus",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            )
            .then((res) => {
              setUsetPoint(userPoint - 100);
              setPayTableData((prev) => {
                const newData = [
                  {
                    key: Date.now(),
                    date: new Date().toLocaleDateString(),
                    item: "차량 점수 확인",
                    state: `-100 포인트`,
                  },
                  ...prev,
                ];
                return newData;
              });
            }); // 포인트 차감 요청
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  return (
    <AipointStyled className={clsx("main-wrap-ai")}>
      <Input
        value={point}
        onChange={handleChange}
        type="text"
        className="plateInput"
        placeholder="등록 시 해당 번호판으로 등록됩니다."
        disabled
      />
      <div className="inputTexts">
        <button onClick={scoreCheck} className="passBtn">
          점수 확인
        </button>
        <div style={{ color: "white" }}>등급: {score?.grade ?? "없음"}</div>
        <div style={{ color: "white" }}>점수: {score?.score ?? "없음"}</div>
        <div style={{ color: "white" }}>
          시작 가격: {score?.price ? score.price.toLocaleString() : "없음"}
        </div>
      </div>
    </AipointStyled>
  );
};

export default AiPoint;
