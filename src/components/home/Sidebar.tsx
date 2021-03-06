import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { reduxStateInt, UserInt } from "../../usefull/interfaces";
import Settings from "./Settings";
import "./styles.css";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

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
                  src="https://placehold.it/100x100"
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
                  <div className="dropdown-links" onClick={()=> setSettings(true)}>Settings</div>
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
              <Row className="single-chat-cont">
                <Col xs={2} className="chat-img-cont p-0">
                  <img
                    src="https://placehold.it/100x100"
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
                  <Row className="w-100 m-0 last-message">Last message</Row>
                  <hr className="separator-chats m-0" />
                </Col>
              </Row>

              <Row className="single-chat-cont active">
                <Col xs={2} className="chat-img-cont p-0">
                  <img
                    src="https://placehold.it/100x100"
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
                      yesterday
                    </Col>
                  </Row>
                  <Row className="w-100 m-0 last-message">Last message</Row>
                  <hr className="separator-chats m-0" />
                </Col>
              </Row>

              <Row className="single-chat-cont">
                <Col xs={2} className="chat-img-cont p-0">
                  <img
                    src="https://placehold.it/100x100"
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
                  <Row className="w-100 m-0 last-message">Last message</Row>
                  <hr className="separator-chats m-0" />
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
