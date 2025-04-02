import axios from "axios";
import { JoinAgreeStyled } from "./styled";
import { Checkbox } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// setAgree의 타입을 React.Dispatch<React.SetStateAction<boolean>>로 명시
const JoinAgree = ({ agree, setAgree }: { agree: boolean; setAgree: any }) => {
  const handleChange = (e: any) => {
    setAgree(e.target.checked); // 체크 여부를 상태로 저장
  };

  const token = useSelector((state: RootState) => state.user.userToken);

  const agreeAxios = (type: string) => {
    axios.post("http://localhost:5000/users/userCheck", { term: type });
  };

  return (
    <JoinAgreeStyled>
      <Checkbox
        checked={agree}
        onChange={handleChange}
        onClick={() => agreeAxios("이용약관")}
      >
        이용약관에 동의
      </Checkbox>
    </JoinAgreeStyled>
  );
};

export default JoinAgree;
