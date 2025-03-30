import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Join from "@/features/JoinPage/Join";
import SocialCallback from "@/components/SocialLogin";
const GoogleCallback = () => {
  return <SocialCallback type="google" />;
};

export default GoogleCallback;
