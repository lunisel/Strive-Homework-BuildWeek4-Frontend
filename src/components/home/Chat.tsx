import { GoSearch } from "react-icons/go";
import {
  BsThreeDotsVertical,
  BsEmojiLaughing,
  BsFillMicFill,
} from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { Form } from "react-bootstrap";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  membersInt,
  reduxStateInt,
  roomsInt,
  UserInt,
} from "../../usefull/interfaces";

const Chat = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [otherUser, setOtherUser] = useState<membersInt | undefined>(undefined);

  const selectedChat: roomsInt | null = useSelector(
    (state: reduxStateInt) => state.chats.selectedChat
  );

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const selectedChatUser = () => {
    let otherUserChat: membersInt | undefined = selectedChat?.members.find(
      (u) => u._id !== user?._id
    );
    setOtherUser(otherUserChat);
  };

  useEffect(() => {
    selectedChatUser();
  }, [selectedChat]);

  return (
    <div className="chat-big-cont">
      {selectedChat ? (
        <>
          <div className="chat-receiver-bar">
            <div className="img-name-container ml-4">
              <img
                src={otherUser?.avatar}
                alt="profile picture"
                className="h-75 w-auto rounded-circle mr-3"
              />
              <span className="name-receiver">{otherUser?.name}</span>
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
                  <div className="chat-cont-without-selected-chat">
                    
                  </div>
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
          </div>{" "}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Chat;
