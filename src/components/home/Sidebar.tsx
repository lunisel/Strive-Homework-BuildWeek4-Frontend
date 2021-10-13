import { Row, Col, Form } from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs"
import "./styles.css";

const Sidebar = () => {
  return (
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

          <h5 className="m-0 my-profile-h5">My profile</h5>
        </div>

        <div className="right-side">
          <BsThreeDotsVertical className="three-dots" />
        </div>
      </div>
      <div className="search-cont">
        <Form.Control
          type="text"
          placeholder="Search or start a new chat"
          className="search-input"
        />
      </div>
      <div className="open-chats">
        <Row className="single-chat-cont">
          <Col xs={2} className="chat-img-cont p-0">
            <img
              src="https://placehold.it/100x100"
              alt="profile picture"
              className="h-100 w-auto rounded-circle"
            />
          </Col>
          <Col xs={10} className="chat-text-cont p-0 pl-2">
            <Row className="d-flex justify-content-between w-100 m-0">
              <Col xs={2} className="p-0 contact-name">
                Name
              </Col>
              <Col xs={2} className="p-0 time-last-message text-right">
                00:00
              </Col>
            </Row>
            <Row className="w-100 m-0 last-message">Last message</Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Sidebar