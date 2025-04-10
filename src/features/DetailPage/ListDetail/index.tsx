import { Table, Button, Modal } from "antd";

interface listProps {
  list: any;
  setListopen: (value: boolean) => void;
  listopen: boolean;
}

const ListDetail = ({ list, setListopen, listopen }: listProps) => {
  const dataSource = list
    ? list.map((x: any, i: number) => ({
        key: String(i + 1),
        index: i + 1,
        name: x.bidUser_name,
        price: x.au_final_price,
      }))
    : [];

  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "입찰자명",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "입찰가",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <Modal
      open={listopen}
      onCancel={() => {
        setListopen(false);
      }}
      footer={null}
      centered
      width={600}
      destroyOnClose
      bodyStyle={{
        maxHeight: "400px", // 내부 최대 높이 제한
        overflowY: "auto", // 세로 스크롤 적용
        padding: "1rem",
      }}
    >
      <Table dataSource={dataSource} columns={columns} />
    </Modal>
  );
};

export default ListDetail;
