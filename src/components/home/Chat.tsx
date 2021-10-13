import { GoSearch } from "react-icons/go";
import {BsThreeDotsVertical} from "react-icons/bs"

const Chat = () => {
  return (
    <>
      <div className="chat-receiver-bar">
        <div className="img-name-container ml-3">
          <img
            src="https://placehold.it/100x100"
            alt="profile picture"
            className="h-75 w-auto rounded-circle mr-3"
          />
          <span className="name-receiver">Name</span>
        </div>
        <div className="search-dots-container mr-3">
            <GoSearch className="search-dots"/>
            <BsThreeDotsVertical className="search-dots"/>
        </div>
      </div>
      <div className="bottom-input-text"></div>
    </>
  );
};

export default Chat;
