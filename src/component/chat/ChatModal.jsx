import UserInfo from "../feed/main/UserInfo";
import Imgs from "../feed/main/Imgs";
import Buttons from "../feed/main/Buttons";
import Chat from "./Chat";
import Texts from "../feed/main/Texts";
import "../../styles/chat/chatModal.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CloseButton from "../basic/CloseButton";
import { useEffect, useRef, useState } from "react";
import { Setting } from "../basic/Setting";
import { getFeedComment } from "../../apis/feedApis";
import { useQuery } from "@tanstack/react-query";
import { renderContent } from "../../util/MentionHashText";
import { useNavigate } from "react-router-dom";

const ChatModal = ({
  profile,
  handleUpdateButtonClick,
  handleOnDelete,
  feedList,
  handleChatButtonClick,
  imgList,
  falseLoveNum,
  setFalseLoveNum,
  falseLike,
  setFalseLike,
}) => {
  // 댓글 정보 가져오는 쿼리
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedComment", feedList.id],
    queryFn: () => {
      return getFeedComment(feedList.id);
    },
    onSuccess: (data) => {},
    staleTime: 1000 * 60 * 5,
  });

  const nav = useNavigate();

  const onDelete = () => {
    handleChatButtonClick(); // 모달창 닫기
    handleOnDelete(); // 삭제 수행
  };

  const onUpdate = () => {
    handleChatButtonClick(); // 모달창 닫기
    handleUpdateButtonClick();
  };

  const [onSetting, setOnSetting] = useState(false);

  const handleSettingButtonClick = () => {
    setOnSetting(!onSetting);
  };

  // 바깥 확인한는 ref
  const backgroundRef = useRef();

  // 모달 바깥 클릭했을 때 닫는 코드
  const handleClickBackground = (e) => {
    if (e.target == backgroundRef.current) {
      handleChatButtonClick();
      setOnSetting(false);
    }
  };

  // if (isError) return <div>Error fetching comments</div>;

  return (
    <div
      className="ChatModal ChatModal-animation"
      onClick={handleClickBackground}
      ref={backgroundRef}
    >
      <div className="ChatModal-wrap">
        <div className="Feed-userInfo ChatModalUser">
          {onSetting ? (
            <div className="ChatModal-Setting">
              <Setting
                width={150}
                settingTitleList={[
                  {
                    title: "삭제하기",
                    onClick: onDelete,
                  },
                  {
                    title: "수정하기",
                    onClick: onUpdate,
                  },
                ]}
              ></Setting>
            </div>
          ) : null}
          <UserInfo
            id={feedList.memberId ? feedList.memberId : feedList.postMember.id}
            profile={profile}
            clock={feedList.createdAt}
            username={
              feedList.nickname
                ? feedList.nickname
                : feedList.postMember.nickname
            }
            Icon={faX}
            handleSettingButtonClick={handleSettingButtonClick}
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
              <Buttons
                handleChatButtonClick={handleChatButtonClick}
                postId={feedList.id}
                like={feedList.liked}
                setFalseLoveNum={setFalseLoveNum}
                falseLoveNum={falseLoveNum ? falseLoveNum : feedList.likeCnt}
                falseLike={falseLike}
                setFalseLike={setFalseLike}
              ></Buttons>

              <div
                className="Texts"
                style={{ height: "100px", overflow: "scroll" }}
              >
                <p className="Texts-good">좋아요 {falseLoveNum}개</p>
                {feedList.nickname !== "" && (
                  <div>
                    <span className="Texts-id">{feedList.nickname}</span>
                    <span
                      className="Texts-content"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {renderContent(
                        feedList.content,
                        [],
                        feedList.mentions,
                        nav
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p
                className="NoImage-Texts"
                style={{
                  marginBottom: "10px",
                  whiteSpace: "pre-wrap",
                  width: "500px",
                  height: "470px ",
                  overflow: "scroll",
                }}
              >
                {renderContent(feedList.content, [], feedList.mentions, nav)}
              </p>
              <Buttons
                postId={feedList.id}
                like={feedList.liked}
                setFalseLoveNum={setFalseLoveNum}
                falseLoveNum={falseLoveNum}
                falseLike={falseLike}
                setFalseLike={setFalseLike}
              ></Buttons>
              <Texts
                comment={""}
                loveNum={feedList.loveNum}
                nicknamse={""}
                falseLoveNum={falseLoveNum}
              ></Texts>
            </div>
          )}

          <div>
            <Chat
              id={feedList.id}
              data={data?.data}
              isLoading={isLoading}
            ></Chat>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
