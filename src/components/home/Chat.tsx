import { GoSearch } from 'react-icons/go'
import {
  BsThreeDotsVertical,
  BsEmojiLaughing,
  BsFillMicFill,
} from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { Form } from 'react-bootstrap'
import SingleChat from './SingleChat'
import { useEffect, useState, KeyboardEvent } from 'react'
import { changeNewMessage } from '../../redux/actions/chats'
import { useDispatch, useSelector } from 'react-redux'
import {
  membersInt,
  reduxStateInt,
  roomsInt,
  UserInt,
} from '../../usefull/interfaces'
import { setTimeout } from 'timers'

// const sendMessageToIng = async () => {
//   const body = {
//     members: ["6167186d325b0e074302edc3"],
//     message: {
//       content: {
//         text: `HELLO INGRID ${new Date()}`,
//       },
//     },
//   };
//   const response = await fetch(`http://localhost:3001/chats`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const message = await response.json();
//   socket.emit("sendmessage", { message: body.message.content.text, room });
//   const { _id } = message;
//   console.log(
//     "JUST SENT A MESSAGE FROM SARAH TO INGRID WITH THE FOLLOWING ID=>",
//     _id
//   );
// };

const Chat = () => {
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [otherUser, setOtherUser] = useState<membersInt | undefined>(undefined)
  const [message, setMessage] = useState<string>('')

  const dispatch = useDispatch()

  const selectedChat: roomsInt | null = useSelector(
    (state: reduxStateInt) => state.chats.selectedChat
  )

  console.log('selected', selectedChat)

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  )

  const selectedChatUser = () => {
    let otherUserChat: membersInt | undefined = selectedChat?.members?.find(
      (u) => u._id !== user?._id
    )
    setOtherUser(otherUserChat)
  }

  const sendMessageToChat = async (message: string) => {
    try {
      const membersArray = await selectedChat!.members.filter(
        (member) => member._id !== user!._id
      )
      const arrayOfMembersIds = await membersArray.map((member) =>
        member._id.toString()
      )
      const sendBody = {
        members: arrayOfMembersIds,
        message: {
          content: {
            text: message,
          },
        },
      }
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(sendBody),
      })
      if (response.ok) {
        let updatedUser = await response.json()
        dispatch(
          changeNewMessage({
            status: true,
            content: message,
            _id: selectedChat!._id,
          })
        )
        setTimeout(() => {
          dispatch(
            changeNewMessage({
              status: false,
              content: '',
              _id: '',
            })
          )
        }, 1000)
        console.log(updatedUser)
      } else {
        console.log('SOMETHING WENT WRONG!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    selectedChatUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])

  return (
    <div className="chat-big-cont">
      {selectedChat ? (
        <>
          <div className="chat-receiver-bar">
            <div className="img-name-container ml-4">
              <img
                src={otherUser?.avatar}
                alt="profile"
                className="h-75 w-auto rounded-circle mr-3"
              />
              <span className="name-receiver">{otherUser?.name}</span>
            </div>
            <div className="search-dots-container mr-3 position-relative">
              <GoSearch className="search-dots mr-2" />
              <div className={dropdown ? 'right-side active' : 'right-side'}>
                <BsThreeDotsVertical
                  className="search-dots"
                  onClick={() => {
                    setDropdown(!dropdown)
                  }}
                />
                {dropdown ? (
                  <div className="dropdown-container chat">
                    <div className="dropdown-links">Info contact</div>
                    <div className="dropdown-links">Delete messages</div>
                    <div className="dropdown-links">Delete chat</div>
                  </div>
                ) : (
                  <div className="chat-cont-without-selected-chat"></div>
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
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.currentTarget.value)
              }
              onKeyPress={(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  sendMessageToChat(message)
                }
              }}
            />
            <BsFillMicFill className="mic-input" />
          </div>
        </>
      ) : (
        <div className="chat-cont-without-selected-chat"></div>
      )}
    </div>
  )
}

export default Chat
