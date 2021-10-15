import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsCheck2All,
} from "react-icons/bs";
import { reduxStateInt, roomsInt, UserInt } from "../../usefull/interfaces";
import { useSelector } from "react-redux";

const SingleChat = () => {
  const selectedChat: roomsInt | null = useSelector(
    (state: reduxStateInt) => state.chats.selectedChat
  );

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  return (
    <div className="chat-messages-cont">
      <div className="chat-content-cont">
        <div className="day-of-message-cont">
          <div className="day-of-message">TODAY</div>
        </div>
        {selectedChat?.history?.map((m) => (
          <div className={m.sender === user?._id ? "sended-message-cont" : "received-message-cont"} key={m._id}>
            {m.sender === user?._id ? "" : <BsFillCaretLeftFill className="caret-left my-2" />}
            <div className={m.sender === user?._id ? "sended-message my-1 p-2" : "received-message my-1 p-2"}>
              <span className="text-message pb-1">
                {m.content.text}
                <span className="time-of-message">00:00</span>
                {m.sender === user?._id ? <BsCheck2All className="check-blue" /> : ""}
              </span>
            </div>
            {m.sender === user?._id ? <BsFillCaretRightFill className="caret-right my-2" /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleChat;
