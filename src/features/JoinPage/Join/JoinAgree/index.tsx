import axios from "axios";
import { JoinAgreeStyled } from "./styled";
import { Checkbox } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// setAgree의 타입을 React.Dispatch<React.SetStateAction<boolean>>로 명시
const JoinAgree = ({ agree, setAgree }: { agree: boolean; setAgree: any }) => {
  const handleChange = (e: any) => {
    setAgree(e.target.checked); // 체크 여부를 상태로 저장
  };

  return (
    <JoinAgreeStyled>
      <div className="joinagree-wrap">
        <div className="joinagree-checklist">
          <ul>
            <li>
              <strong>1. 서비스 개요</strong>
              <br />본 사이트는 사용자 간 자동차 번호판 경매를 중개하는
              플랫폼이며, 모든 이용자는 회원가입을 통해 정식 등록된 사용자로서
              경매에 참여할 수 있습니다.
            </li>
            <br></br>
            <li>
              <strong>2. 번호판 등록 책임</strong>
              <br />
              경매에 등록된 번호판에 대한 권리와 책임은 등록자에게 있으며, 본
              사이트는 해당 번호판의 실효성이나 희소성에 대해 보증하지 않습니다.
            </li>
            <br></br>
            <li>
              <strong>3. 회원 정보의 진위</strong>
              <br />
              경매 참여자는 반드시 본인의 명의로 가입해야 하며, 타인의 정보
              도용이나 허위 기재 시 서비스 이용이 제한될 수 있습니다.
            </li>
            <br></br>
            <li>
              <strong>4. 포인트 및 입찰 정책</strong>
              <br />
              입찰 참여를 위해서는 사전에 충분한 포인트가 충전되어 있어야 하며,
              포인트 차감 및 반환은 별도 정책에 따릅니다.
            </li>
            <br></br>
            <li>
              <strong>5. 낙찰 후 절차</strong>
              <br />
              낙찰된 번호판은 정해진 기간 내 소유권 이전 등 필요한 절차를
              완료해야 하며, 이를 이행하지 않으면 낙찰이 무효 처리될 수
              있습니다.
            </li>
            <br></br>
            <li>
              <strong>6. 사용자 콘텐츠 관리</strong>
              <br />
              게시물, 경매 내용, 입찰 기록 등 사용자가 생성한 콘텐츠는 관련 법령
              및 운영정책에 따라 관리되며, 필요 시 사전 경고 없이 삭제될 수
              있습니다.
            </li>
            <br></br>
            <li>
              <strong>7. 서비스 면책 조항</strong>
              <br />
              서비스 중단, 시스템 장애 등 예외 상황 발생 시, 회사에 고의 또는
              중대한 과실이 없는 한 법적 책임을 지지 않습니다.
            </li>
            <br></br>
            <li>
              <strong>8. 개인정보 및 기록 보관</strong>
              <br />
              회원 탈퇴 시 개인정보 및 경매 관련 기록은 관련 법령에 따라 일정
              기간 보관되며, 이후 안전하게 삭제됩니다.
            </li>
            <br></br>
            <li>
              <strong>9. 약관 동의 및 숙지 의무</strong>
              <br />본 약관은 서비스 이용 시 반드시 숙지해야 하며, 동의하지 않을
              경우 회원가입 및 서비스 이용이 제한됩니다.
            </li>
          </ul>
        </div>
        <Checkbox
          className="joinagree-check"
          checked={agree}
          onChange={handleChange}
        >
          이용약관에 동의
        </Checkbox>
      </div>
    </JoinAgreeStyled>
  );
};

export default JoinAgree;
