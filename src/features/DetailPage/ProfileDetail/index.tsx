import MyPost from "@/features/MyPageManeger/MyAccount/MyPosts/MyPost";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface SellerModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  userId: string;
}

const SellerModal = ({ open, onClose, name, userId }: SellerModalProps) => {
  const [approvedPosts, setApprovedPosts] = useState([]);

  useEffect(() => {
    if (!open) return;

    // userId에 대한 게시글 가져오기
    axios
      .post("http://15.164.52.122/boards/userPosts", {
        userId,
      })
      .then((res) => {
        const posts = res.data.map((item: any) => {
          return {
            auctionID: item.au_id,
            vehicleTitle: item.vehicle_plate_num,
            finalPrice: item.bid_price,
            endTime: item.au_end_time,
            userName: name,
            carImage: item.vehicle_car_img,
            gradeName: item.grade_grade_name,
            minPrice: item.grade_min_price,
          };
        });

        console.log("post : ", posts);

        setApprovedPosts(posts);
      })
      .catch((err) => console.error("유저 게시글 조회 오류:", err));
  }, [open, userId]);

  return (
    <Modal
      className="Modal"
      centered
      title="판매자 정보"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <p>
        <strong> 판매자 이름:</strong> {name}
      </p>
      <br />
      <MyPost type="posts" goingPosts={approvedPosts} isWide={true} />
    </Modal>
  );
};

export default SellerModal;
