import { GoSearch } from "react-icons/go";
import {
  BsThreeDotsVertical,
  BsEmojiLaughing,
  BsFillMicFill,
} from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { Form } from "react-bootstrap";
import SingleChat from "./SingleChat";
import { useState } from "react";

const Chat = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <div className="chat-big-cont">
      <div className="chat-receiver-bar">
        <div className="img-name-container ml-4">
          <img
            src="https://placehold.it/100x100"
            alt="profile picture"
            className="h-75 w-auto rounded-circle mr-3"
          />
          <span className="name-receiver">Name</span>
        </div>
        <div className="search-dots-container mr-3 position-relative">
          <GoSearch className="search-dots mr-2" />
          <div className={dropdown ? "right-side active" : "right-side"}>
            <BsThreeDotsVertical
              className="search-dots"
              onClick={() => {
                setDropdown(!dropdown);
                console.log(dropdown);
              }}
            />
            {dropdown ? (
              <div className="dropdown-container chat">
                <div className="dropdown-links">Info contact</div>
                <div className="dropdown-links">Delete messages</div>
                <div className="dropdown-links">Delete chat</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <SingleChat />
      <div className="bottom-input-text">
        <BsEmojiLaughing className="bottom-icons-bar mr-3" />
        <FiPaperclip className="bottom-icons-bar mr-2" />
        <Form.Control
          type="text"
          placeholder="Write a message"
          className="search-input chat"
        />
        <BsFillMicFill className="mic-input" />
      </div>
    </div>
  );
};

export default Chat;
