import { useEffect, useState, KeyboardEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Row, Col, FormControl } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reduxStateInt, UserInt, roomsInt } from "../../usefull/interfaces";
import {
  addChatHistory,
  addSelectedChat,
  disconectChats,
} from "../../redux/actions/chats";
import { disconnectUser } from "../../redux/actions/user";
import Settings from "./Settings";
import "./styles.css";

const Sidebar = ({ history }: RouteComponentProps) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [searchedUsers, setSearchUsers] = useState<UserInt[] | null>(null);

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const chats: roomsInt[] | null = useSelector(
    (state: reduxStateInt) => state.chats.rooms
  );

  const selectedChat: roomsInt | null = useSelector(
    (state: reduxStateInt) => state.chats.selectedChat
  );

  const dispatch = useDispatch();

  const fetchChatHistory = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        console.log("RESPONSE OK SIDEBAR");
        let data = await response.json();
        console.log("CHAT HISTORY SIDEBAR", data);
        dispatch(addChatHistory(data));
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersToChatWith = async (query: string) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users?name=${query}`
      );
      let data = await response.json();
      let users = data.users;
      setSearchUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

  const openChatOnSearch = async (u: UserInt) => {
    console.log("Selected", u);
    const userId: string = u._id!.toString();
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/${userId}/check`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response.ok)
      if (response.ok) {
        console.log("openChatOnSearch found a pre-existing chat")
        let chat = await response.json();
        dispatch(addSelectedChat(chat));
      } else {
        console.log("openChatOnSearch did not find a pre-existing chat and will now run createNewEmptyChat")
        createNewChat(userId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewChat = async (userId: string) => {
    console.log("OPENING createNewChat function")
    const objectToSend = {
      members: [userId.toString()],
      message: {
        content: {
          text: "Great news, now you can message each other!",
        },
      },
    };
    console.log("The object I am trying to send is", objectToSend)
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(objectToSend),
      });
      console.log("The response is OK?", response.ok)
      if (response.ok) {
        const newChat = await response.json();
        dispatch(addSelectedChat(newChat));
      } else {
        console.log(response.status)
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="side-bar"
      onMouseDown={() =>
        setTimeout(function () {
          setSearchUsers(null);
        }, 1000)
      }
    >
      {settings ? (
        <Settings />
      ) : (
        <>
          <div className="my-profile">
            <div className="left-side">
              <div className="profile-img-cont">
                <img
                  src={user!.avatar}
                  alt="profile"
                  className="img-fluid rounded-circle"
                />
              </div>

              <h5
                className="m-0 my-profile-h5"
                onClick={() => setSettings(true)}
              >
                {user!.name}
              </h5>
            </div>

            <div className={dropdown ? "right-side active" : "right-side"}>
              <BsThreeDotsVertical
                className="three-dots"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              />
              {dropdown ? (
                <div className="dropdown-container">
                  <div className="dropdown-links">New group</div>
                  <div
                    className="dropdown-links"
                    onClick={() => setSettings(true)}
                  >
                    Settings
                  </div>
                  <Link
                    to="/login"
                    className="dropdown-links"
                    onClick={() => {
                      console.log("DISCONECTING");
                      dispatch(disconnectUser());
                      dispatch(disconectChats());
                    }}
                  >
                    Log-out
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="search-cont">
            <FormControl
              type="text"
              placeholder="Search or start a new chat"
              className="search-input sidebar"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.currentTarget.value)
              }
              onKeyPress={(e: KeyboardEvent) => {
                if (e.key === "Enter") {
                  fetchUsersToChatWith(query);
                }
              }}
            />
          </div>
          <div className="open-chats">
            <div className="single-chat-and-hr-cont">
              {searchedUsers &&
                query !== "" &&
                searchedUsers.map((u) => (
                  <Row
                    className="single-chat-cont"
                    onClick={() => openChatOnSearch(u)}
                    key={u._id}
                  >
                    <Col xs={2} className="chat-img-cont p-0">
                      <img
                        src={u.avatar}
                        alt="profile"
                        className="h-100 w-auto rounded-circle"
                      />
                    </Col>
                    <Col xs={10} className="chat-text-cont p-0 h-100">
                      <Row className="d-flex justify-content-between w-100 m-0 position-relative">
                        <Col xs={2} className="p-0 contact-name">
                          {u.name}
                        </Col>
                      </Row>
                      <hr className="separator-chats m-0" />
                    </Col>
                  </Row>
                ))}
              {(!searchedUsers || query === "") &&
                chats?.map((c) => (
                  <Row
                    className={
                      selectedChat?.members === c.members
                        ? "single-chat-cont active"
                        : "single-chat-cont"
                    }
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      dispatch(addSelectedChat(c));
                    }}
                    key={c._id}
                  >
                    <Col xs={2} className="chat-img-cont p-0">
                      <img
                        src={c.members.find((u) => u._id !== user?._id)?.avatar}
                        alt="profile"
                        className="h-100 w-auto rounded-circle"
                      />
                    </Col>
                    <Col xs={10} className="chat-text-cont p-0 h-100">
                      <Row className="d-flex justify-content-between w-100 m-0 position-relative">
                        <Col xs={7} className="p-0 contact-name">
                          {c.members.find((u) => u._id !== user?._id)?.name}
                        </Col>
                        <Col
                          xs={3}
                          className="p-0 time-last-message text-right pr-3"
                        >
                          {() => {
                            let date = new Date(c.updatedAt);
                            let time = date.getHours();
                            console.log("TIMEEEEE", time);
                          }}
                        </Col>
                      </Row>
                      {c.history.length > 0 && (
                        <Row className="w-100 m-0 last-message">
                          {c.history.slice(-1)[0].content.text}
                        </Row>
                      )}
                      <hr className="separator-chats m-0" />
                    </Col>
                  </Row>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Sidebar);
