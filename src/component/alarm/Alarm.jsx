import React, { useEffect, useState, useRef } from "react";
import "../../styles/alarm/alarm.scss";
import { FaRegBell } from "react-icons/fa6";
import CloseButton from "../basic/CloseButton";
import { useAlarm } from "../../hooks/useAlarm";
import { useNavigate } from "react-router-dom";
export const Alarm = () => {
  const nav = useNavigate();
  // 알람 데이터 받아오기
  const { message, className, newAlarm, handleClose, postId } = useAlarm();

  // 알람 클릭하면 게시물로 넘어가기, 알림 타입에 따라 다르게 설정해야됨 추후 코드 수정
  const handleAlarmClick = () => {
    handleClose();
    nav(`post/${postId}`);
  };

  return (
    <div className={`Alarm ${className}`}>
      <div className="Alarm-top">
        <div className="Alarm-top-left">
          <FaRegBell />
          <span style={{ marginLeft: "10px" }}>알림</span>
        </div>
        <div className="Alarm-top-right">
          <CloseButton size={15} onCloseButton={handleClose} />
        </div>
      </div>
      <div className="Alarm-text" onClick={handleAlarmClick}>
        {message}
      </div>
    </div>
  );
};
