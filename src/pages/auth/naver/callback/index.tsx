import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Join from "@/features/JoinPage/Join";
import axios from "axios";
import SocialCallback from "@/components/SocialLogin";
const NaverCallback = () => {
  return <SocialCallback type="naver" />;
};

export default NaverCallback;
