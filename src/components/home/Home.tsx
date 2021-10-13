import { Row, Col} from "react-bootstrap";
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import "./styles.css";
import { useSelector } from "react-redux";
import { reduxStateInt, UserInt } from "../../usefull/interfaces";
import React from "react";

const Home = () => {
  const user: UserInt | null = useSelector((state: reduxStateInt) => state.user.currentUser)
  return (
    <div className="home-cont">
      <div className="green-background-line"></div>
      <div className="content-home-cont">
        <Row className="m-0 h-100">
          <Col xs={4} className="side-bar p-0">
            <Sidebar/>
          </Col>
          <Col xs={8} className="chat-container p-0">
            <Chat/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
