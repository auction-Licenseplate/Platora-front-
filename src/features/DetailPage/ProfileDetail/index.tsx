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
      .post("http://localhost:5000/boards/userPosts", {
        userId,
      })
      .then((res) => {
        console.log(res.data);
        // setApprovedPosts(res.data);
      })
      .catch((err) => console.error("유저 게시글 조회 오류:", err));
  }, [open, userId]);

  return (
    <Modal title="판매자 정보" open={open} onCancel={onClose} footer={null}>
      <p>
        <strong> 판매자 이름:</strong> {name}
      </p>
      <MyPost type="posts" goingPosts={approvedPosts} />
    </Modal>
  );
};

export default SellerModal;
