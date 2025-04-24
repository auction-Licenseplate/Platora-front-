import { Table, Button, Modal } from "antd";

interface listProps {
  list: any;
  setListopen: (value: boolean) => void;
  listopen: boolean;
}

const ListDetail = ({ list, setListopen, listopen }: listProps) => {
  const dataSource = list
    ? list
        .filter((x: any) => x.bid_bid_price !== null)
        .map((x: any, i: number) => ({
          key: String(i + 1),
          index: i + 2,
          name: x.bidUser_name,
          price: x.bid_bid_price,
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
      className="listdetail-modal"
    >
      <Table className="tableModal" dataSource={dataSource} columns={columns} />
    </Modal>
  );
};

export default ListDetail;
