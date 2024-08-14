import React, { useState } from "react";
import { deleteFeed } from "../../../apis/feedApis";
import { useGetFeedImg } from "../../../react-query/useFeed";
import ChatModal from "../../chat/ChatModal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UpdateFeed } from "../delete/UpdateFeed";

export const FeedModal = ({ feedList }) => {
  // 이미지 데이터 가져오기
  const { data, isLoading } = useGetFeedImg(feedList.id);

  let imgList = data?.data;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [falseLoveNum, setFalseLoveNum] = useState(feedList.loveNum);

  const [falseLike, setFalseLike] = useState(feedList.liked);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleUpdateButtonClick = () => {
    if (isUpdate) {
      return;
    }
    setIsSettingOpen(false);
    setIsUpdate(true);
  };

  const hanldUpdateCloseButtonClick = () => {
    setIsUpdate(false);
  };

  const queryClient = useQueryClient();
  const { status, mutate } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries(["feeds"]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleOnDelete = () => {
    const bool = window.confirm("정말로 삭제하시겠습니까?");
    if (bool) {
      mutate(feedList.id);
    }

    setIsSettingOpen(false);
  };

  if (isLoading) return "로딩중..";
  return (
    <>
      {isUpdate ? (
        <UpdateFeed
          setIsUpdate={setIsUpdate}
          hanldUpdateCloseButtonClick={hanldUpdateCloseButtonClick}
          feedList={feedList}
          imgList={imgList}
        ></UpdateFeed>
      ) : null}
      {imgList?.length !== 0 ? (
        <ChatModal
          page={true}
          profile={feedList.profile}
          handleUpdateButtonClick={handleUpdateButtonClick}
          handleOnDelete={handleOnDelete}
          imgList={imgList}
          feedList={feedList}
          handleChatButtonClick={handleChatButtonClick}
          falseLoveNum={falseLoveNum}
          falseLike={falseLike}
          setFalseLike={setFalseLike}
          setFalseLoveNum={setFalseLoveNum}
        />
      ) : (
        <ChatModal
          page={true}
          profile={feedList.profile}
          handleUpdateButtonClick={handleUpdateButtonClick}
          handleOnDelete={handleOnDelete}
          imgList={imgList}
          feedList={feedList}
          handleChatButtonClick={handleChatButtonClick}
          falseLoveNum={falseLoveNum}
          setFalseLoveNum={setFalseLoveNum}
          falseLike={falseLike}
          setFalseLike={setFalseLike}
        />
      )}
    </>
  );
};
