import IdFind from "./IdFind";
import PwFind from "./PwFind";
interface FindPageProps {
  type: string;
}
const FindPage = ({ type }: FindPageProps) => {
  return <div>{type === "id" ? <IdFind /> : <PwFind />}</div>;
};

export default FindPage;
