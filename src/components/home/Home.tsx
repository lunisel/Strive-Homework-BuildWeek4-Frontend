import { Row, Col} from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import "./styles.css";

const Home = ({ history, location, match }: RouteComponentProps) => {
  return (
    <div className="home-cont">
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
