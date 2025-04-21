import { AipointStyled } from "./styled";
import { Input, Button, Modal } from "antd";
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
  const [isScoreReady, setIsScoreReady] = useState(false); // ✅ 상태 추가

  const token = useSelector((state: RootState) => state.user.userToken);

  useEffect(() => {
    if (token === "" || !token) return;

    let isMounted = true; //마운트 여부 체크

    axios
      .get("http://15.164.52.122/users/user-info", {
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
📌 License Plate Grading Criteria (Apply the highest applicable grade first!):

Both front and back numbers are the same (e.g., "11가 1111") → Grade 1 (Same numbers front and back, and both are "poker" numbers)

Both front and back numbers are in ascending order (e.g., "12나 3456") → Grade 2 (Front and back ascending order)

Front and back are different poker numbers (e.g., "11다 2222") → Grade 3

Front is descending, back is poker (e.g., "32라 1111") → Grade 4

Only back is a poker number (e.g., "○○○마 1111") → Grade 5

Only back is in ascending order (e.g., "○○○바 1234") → Grade 6

Back is in "A000" format (e.g., "○○○사 1000") → Grade 7

Back is a meaningful number (e.g., "1004", "1000", "0911", "0488") → Grade 8

Back is in "AABB" format (e.g., "1122") → Grade 9

Back is personally preferred (e.g., birthday, phone number) → Grade 10

⚠️ Exception Rule

If the plate contains three or more 4s in both front and back numbers combined, it is automatically Grade 10, with the lowest score and price.

📌 License Plate Analysis Steps

Split the plate into front numbers (2 or 3 digits) and back numbers (4 digits).

E.g., "12가 3456" → Front: "12", Back: "3456"

E.g., "341나 2345" → Front: "341", Back: "2345"

E.g., "11가 1111" → Front: "11", Back: "1111"

Determine whether each part is:

Ascending (e.g., "123", "3456")

Descending (e.g., "98", "7654")

Poker (all digits are the same, e.g., "11", "2222")

📌 Task
Analyze the given license plate ${point} and return the grade, score (out of 100), and price (from 2,000,000 to 100,000 KRW).

Evaluate at least 10 possible results based on the grading logic.

Return only the highest grade/score/price result among them.

Output must be in the following strict JSON format and nothing else:

`;
  const handleChange = (e) => {
    setPoint(e.target.value);
  };

  const scoreCheck = () => {
    if (userPoint < 100) {
      return Modal.error({
        centered: true,
        title: "포인트 부족",
        content: "포인트 100P가 필요한 서비스입니다. 충전 후 이용해 주세요.",
      });
    } else if (point === "") {
      return Modal.error({
        centered: true,
        content: "차량 번호를 정확히 입력해 주세요.",
      });
    } else {
      setIsScoreReady(false); // 실행 전에 비활성화
      axios
        .post("http://15.164.52.122/openai/aichat", { message: prompt }) // 객체로 전송
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
              "http://15.164.52.122/pay/pointminus",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            )
            .then((res) => {
              setUsetPoint(userPoint - 100);
              setIsScoreReady(true);
            }); // 포인트 차감 요청
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };
  const handleShowScore = () => {
    Modal.info({
      centered: true,
      title: "번호판 등급 확인 결과",
      content: (
        <div>
          <p>번호판: {point}</p>
          <p>등급: {score?.grade ?? "없음"}</p>
          <p>점수: {score?.score ?? "없음"}</p>
          <p>시작 가격: {score?.price?.toLocaleString() ?? "없음"}</p>
        </div>
      ),
      okText: "확인",
    });
  };

  return (
    <AipointStyled className={clsx("main-wrap-ai")}>
      <div className="inputTexts">
        <button onClick={scoreCheck} className="rankBtn">
          <p>등급 측정하기</p>
        </button>
        <button
          onClick={handleShowScore}
          className="rankBtn"
          disabled={!isScoreReady}
          style={{
            opacity: isScoreReady ? 1 : 0.5,
            cursor: isScoreReady ? "pointer" : "not-allowed",
          }}
        >
          <p>등급 확인</p>
        </button>
      </div>
    </AipointStyled>
  );
};

export default AiPoint;
