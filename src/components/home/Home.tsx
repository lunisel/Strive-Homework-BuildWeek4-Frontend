import { Row, Col, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import "./styles.css";

const Home = ({ history, location, match }: RouteComponentProps) => {
  return (
    <div className="home-cont">
      <div className="content-home-cont">
        <Row className="m-0 h-100">
          <Col xs={4} className="side-bar p-0">
            <div className="my-profile">
              <div className="profile-img-cont">
                <img
                  src="https://placehold.it/100x100"
                  alt="profile picture"
                  className="img-fluid rounded-circle"
                />
              </div>

              <h5 className="m-0 my-profile-h5">My profile</h5>
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
                <Col className="chat-img-cont p-0">
                  <img
                    src="https://placehold.it/50x50"
                    alt="profile picture"
                    className="img-fluid rounded-circle"
                  />
                </Col>
                <Col className="chat-text-cont p-0">
                  <Row>
                    <Col>Name</Col>
                    <Col>00:00</Col>
                  </Row>
                  <Row>Last message</Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={8} className="chat-container p-0"></Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
