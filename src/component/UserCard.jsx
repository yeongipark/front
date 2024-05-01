import { useState, useRef } from "react";
import "../styles/userCard.css";

export default function UserCard({ userName, comment, width }) {
  const className = `${width}`;
  return (
    <div id="usercard">
      <img
        id="userImg"
        className={className}
        src={"public/image/dp.jpg"}
        alt="프로필사진"
        onClick={() => {
          handleModal();
        }}
      />

      <div className="usercard-comment">
        <span>
          <b>{userName}</b>
        </span>
        {comment ? <span>{comment} </span> : null}
      </div>
    </div>
  );
}
