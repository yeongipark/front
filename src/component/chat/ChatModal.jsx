import UserInfo from "../feed/main/UserInfo";
import Imgs from "../feed/main/Imgs";
import Buttons from "../feed/main/Buttons";
import Chat from "./Chat";
import Texts from "../feed/main/Texts";
import "../../styles/chat/chatModal.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CloseButton from "../basic/CloseButton";
import { useEffect, useRef } from "react";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { getFeedComment } from "../../apis/feedApis";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../util/BaseUrl";

const ChatModal = ({ feedList, handleChatButtonClick, imgList }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedComment", feedList.id],
    queryFn: () => {
      return getFeedComment(feedList.id);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);

  const backgroundRef = useRef();

  // 모달 바깥 클릭했을 때 닫는 코드
  const handleClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      handleChatButtonClick();
    }
  };

  // if (isError) return <div>Error fetching comments</div>;

  return (
    <div
      className="ChatModal ChatModal-animation"
      ref={backgroundRef}
      onClick={handleClickBackground}
    >
      <div className="ChatModal-wrap">
        <div className="Feed-userInfo ChatModalUser">
          <UserInfo
            clock={feedList.createdAt}
            username={feedList.nickname}
            Icon={faX}
          ></UserInfo>
          <div className="ChatModalCloseButton">
            <CloseButton
              size={20}
              onCloseButton={handleChatButtonClick}
            ></CloseButton>
          </div>
        </div>
        <div className="Feed-texts">
          {imgList?.length !== 0 ? (
            <div className="main-img">
              <Imgs imgList={imgList}></Imgs>
              <Buttons></Buttons>
              <div
                className="Texts"
                style={{ height: "100px", overflow: "scroll" }}
              >
                <p className="Texts-good">좋아요 {feedList.loveNum}개</p>
                {feedList.nickname !== "" && (
                  <div>
                    <span className="Texts-id">{feedList.nickname}</span>
                    <span
                      className="Texts-content"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {feedList.content}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p
                style={{
                  marginBottom: "10px",
                  whiteSpace: "pre-wrap",
                  width: "500px",
                  height: "470px ",
                  overflow: "scroll",
                }}
              >
                {feedList.content}
              </p>
              <Buttons></Buttons>
              <Texts
                comment={""}
                loveNum={feedList.loveNum}
                nicknamse={""}
              ></Texts>
            </div>
          )}

          <div>
            <Chat id={feedList.id} data={data?.data}></Chat>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
