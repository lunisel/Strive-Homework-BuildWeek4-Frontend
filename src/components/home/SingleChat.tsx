import { BsFillCaretLeftFill, BsFillCaretRightFill, BsCheck2All } from "react-icons/bs";

const SingleChat = () => {
  return (
    <div className="chat-messages-cont">
      <div className="chat-content-cont">
          <div className="day-of-message-cont">
              <div className="day-of-message">
                  TODAY
              </div>
          </div>
        <div className="received-message-cont">
          <BsFillCaretLeftFill className="caret-left my-2" />
          <div className="received-message my-1 p-2">
            <span className="text-message pb-1">
              This is my message for you dskngfdob nwgonbsvljbsvjbw fjnbw jnbw
              jbnwfj nbwgfrjnb wgronbgw obnnw grvj obg2rj bo2f ojrg2 boj2 1
              <span className="time-of-message">00:00</span>
            </span>
          </div>
        </div>

        <div className="sended-message-cont">
          <div className="sended-message my-1 p-2">
            <span className="text-message pb-1">
              My last message
              <span className="time-of-message">00:00</span>
              <BsCheck2All className="check-blue"/>
            </span>
          </div>
          <BsFillCaretRightFill className="caret-right my-2" />
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
