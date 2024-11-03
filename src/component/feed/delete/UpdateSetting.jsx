import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../../styles/feed/create/createSetting.scss";

const CreateSetting = ({ onSetIsChat, isChat }) => {
  const [toggle, setToggle] = useState(true);

  // 글설정 누르면 글자 나타나도록
  const onClick = () => {
    setToggle(!toggle);
  };
  console.log(isChat);
  const className = `table-wrap ${toggle ? "up" : "down"}`;

  const onChange = (e) => {
    onSetIsChat(JSON.parse(e.target.value));
  };

  return (
    <div className="CreateSetting">
      <div className="setting-text">
        <label htmlFor="set-toggle" className="setting-label">
          <span style={{ marginRight: "10px" }}>글 설정</span>
        </label>
        <input
          type="checkbox"
          id="set-toggle"
          style={{ display: "none" }}
          onClick={onClick}
        />
        <FontAwesomeIcon
          onClick={onClick}
          icon={toggle ? faCaretUp : faCaretDown}
          className="arrow"
        />
      </div>
      <div className="radio">
        <div className={className}>
          <div className="radio-item">
            <label htmlFor="open">채팅 열기</label>
            <div>
              <input
                checked={isChat}
                type="radio"
                id="open"
                name="setting"
                value={true}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="radio-item">
            <label htmlFor="close">
              <td>채팅 닫기</td>
            </label>
            <div>
              <input
                checked={!isChat}
                type="radio"
                name="setting"
                id="close"
                value={false}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSetting;
