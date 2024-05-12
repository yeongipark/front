import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { postFeedLike } from "../../../apis/feedApis";

import "../../../styles/feed/main/buttons.scss";

const Buttons = () => {
  return (
    <div className="Buttons">
      <div className="buttons">
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
      <div className="buttons">
        <FontAwesomeIcon icon={faComment} />
      </div>
      <div className="buttons">
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  );
};

export default Buttons;
