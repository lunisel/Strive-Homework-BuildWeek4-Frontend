import { useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./styles.css";
import { io } from "socket.io-client";

const Home = ({history}: RouteComponentProps) => {
  const ADDRESS = "http://localhost:3001";
  const socket = io(ADDRESS, { transports: ["websocket"] });

  useEffect(() => {
    console.log("HELLO THIS IS THE USEEFFECT AT HOME");
    loadHome();
    loadSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSocket = () => {
    socket.on("connect", () => {
      console.log("Connection established!");
      console.log("🚀SOCKET.ID=>", socket.id);
    });
    socket.on("joinedRoom", () => {
      console.log("Now I've joined the rooms!");
    });
  };

  const loadHome = async () => {
    await getMyProfile();
    console.log("HOME LOADED!");
  };


  const getMyProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const profile = await response.json();
      console.log("HERE I AM=>", profile);
    } else {
      history.push("/login")
    }
  };

  return (
    <div className='home-cont'>
      <div className='green-background-line'></div>
      <div className='content-home-cont'>
        <Row className='m-0 h-100'>
          <Col xs={4} className='side-bar p-0'>
            <Sidebar />
          </Col>
          <Col xs={8} className='chat-container p-0'>
            <Chat />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
