import { useEffect } from "react";
import OpenAI from "openai";

const OpenAiTest = () => {
  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const openai = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true, // 브라우저에서 실행할 경우 필요
        });

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "안녕" }],
        });

        console.log(completion.choices[0].message);
      } catch (error) {
        console.error("OpenAI API 호출 실패:", error);
      }
    };

    fetchCompletion();
  }, []);

  return <div>OpenAI 테스트 실행 중...</div>;
};

export default OpenAiTest;
