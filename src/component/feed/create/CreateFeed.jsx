import "../../../styles/feed/create/craeteFeed.scss";
import Content from "./Content";
import CreateSetting from "./CreateSetting";
import Image from "./Image";
import CloseButton from "../../basic/CloseButton";
import Button from "../../basic/Button";
import useCreateFeed from "../../../store/feed/useCreateFeed";
import { useState } from "react";
const CreateFeed = () => {
  const { setToggle } = useCreateFeed((state) => state);
  const formData = new FormData();

  const [hash, setHash] = useState([]);
  const [mention, setMention] = useState([]);
  const [content, setContent] = useState("");
  const [isChat, setIsChat] = useState(true);

  const onRemove = () => {
    const result = content.replace(/@\[([\w\s]+)\]\(\d+\)/g, "$1");
    return result;
  };

  const onSubmit = () => {
    let removeContent = onRemove();
  };

  const appendHash = (text) => {
    let arr = [...hash, text];
    setHash(arr);
  };

  const appendMention = (text) => {
    let arr = [...mention, text];
    setMention(arr);
  };

  const onChangeContent = (e) => {
    setContent(e);
  };

  const onSetIsChat = (value) => {
    setIsChat(value);
  };

  const onClose = () => {
    setToggle();
  };

  console.log(isChat);

  return (
    <div className="CreateFeed">
      <div className="wrap">
        <div className="top">
          <h3>새 게시물 만들기</h3>
          <div id="createFeed-closeButton">
            <CloseButton size={"18"} onCloseButton={onClose}></CloseButton>
          </div>
        </div>
        <div className="img">
          <Image formData={formData}></Image>
        </div>
        <div className="createFeed-content">
          <Content
            appendHash={appendHash}
            appendMention={appendMention}
            onChangeContent={onChangeContent}
            content={content}
          ></Content>
        </div>
        <div className="setting">
          <CreateSetting onSetIsChat={onSetIsChat}></CreateSetting>
          <div className="btn-wrap">
            <Button
              text={"게시글 등록"}
              fontSize={16}
              onCilck={onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeed;
