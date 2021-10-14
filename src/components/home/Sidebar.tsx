import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reduxStateInt, UserInt, roomsInt } from "../../usefull/interfaces";
import { addChatHistory } from "../../redux/actions/chats";
import Settings from "./Settings";
import "./styles.css";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const chats: roomsInt[] = useSelector(
    (state: reduxStateInt) => state.chats.rooms
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
        console.log("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    console.log("USE EFFECT SIDEBAR");
  }, []);

  return (
    <>
      {settings ? (
        <Settings />
      ) : (
        <>
          <div className="my-profile">
            <div className="left-side">
              <div className="profile-img-cont">
                <img
                  src={user!.avatar}
                  alt="profile picture"
                  className="img-fluid rounded-circle"
                />
              </div>

              <h5 className="m-0 my-profile-h5">{user!.name}</h5>
            </div>

            <div className={dropdown ? "right-side active" : "right-side"}>
              <BsThreeDotsVertical
                className="three-dots"
                onClick={() => {
                  setDropdown(!dropdown);
                  console.log(dropdown);
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
                  <Link to="/login" className="dropdown-links">
                    Log-out
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="search-cont">
            <Form.Control
              type="text"
              placeholder="Search or start a new chat"
              className="search-input sidebar"
            />
          </div>
          <div className="open-chats">
            <div className="single-chat-and-hr-cont">
              {chats &&
                chats?.map((c) => (
                  <>
                    <Row className="single-chat-cont">
                      <Col xs={2} className="chat-img-cont p-0">
                        <img
                          src={}
                          alt="profile picture"
                          className="h-100 w-auto rounded-circle"
                        />
                      </Col>
                      <Col xs={10} className="chat-text-cont p-0 h-100">
                        <Row className="d-flex justify-content-between w-100 m-0 position-relative">
                          <Col xs={2} className="p-0 contact-name">
                            Name
                          </Col>
                          <Col
                            xs={3}
                            className="p-0 time-last-message text-right pr-3"
                          >
                            00:00
                          </Col>
                        </Row>
                        <Row className="w-100 m-0 last-message">
                          Last message
                        </Row>
                        <hr className="separator-chats m-0" />
                      </Col>
                    </Row>
                  </>
                ))}

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
