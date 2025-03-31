import IdFind from "./IdFind";
import PwFind from "./PwFind";
interface FindPageProps {
  type: string;
}
const FindPage = ({ type }: FindPageProps) => {
  return (
    <div style={{ marginTop: 100 }}>
      {type === "id" ? <IdFind /> : <PwFind />}
    </div>
  );
};

export default FindPage;
