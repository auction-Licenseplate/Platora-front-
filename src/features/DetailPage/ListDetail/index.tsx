import { ListDetailStyled } from "./styled";
interface listProps {
  list: any;
  setListopen: (value: string) => void;
}
const ListDetail = ({ list, setListopen }: listProps) => {
  return (
    <ListDetailStyled>
      <div></div>
    </ListDetailStyled>
  );
};

export default ListDetail;
