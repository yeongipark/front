import React from "react";
import User from "/image/dp.jpg";
import { detailDate } from "../../util/detailDate";
import { useNavigate } from "react-router-dom";
import useAlarmStore from "../../store/alarm/useAlarmStore";

export const AlarmItem = ({ text, createdAt, postId, type, userId }) => {
  const nav = useNavigate();
  const { setOpen } = useAlarmStore();

  // 이미지 클릭한 경우 알림 보낸 사용자 프로필로 이동시키는 함수
  const handleImgClick = () => {
    setOpen(false);
    nav(`/Profile/${userId}`);
  };

  // 텍스트 클릭한 경우 실행할 함수
  const handleTextClick = () => {
    setOpen(false);
    nav(`/post/${postId}`);
  };
  return (
    <div className="AlarmItem">
      <div className="AlarmItem-left">
        {/* 이미지랑 텍스트 */}
        <div onClick={handleImgClick}>
          <img src={User} alt="유저이미지" />
        </div>
        <p onClick={handleTextClick}>{text}</p>
      </div>
      <div className="AlarmItem-right">
        {/* 시간 */}
        <p style={{ color: "lightgrey" }}>{detailDate(new Date(createdAt))}</p>
      </div>
    </div>
  );
};
