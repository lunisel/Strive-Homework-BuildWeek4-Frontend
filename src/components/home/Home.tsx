import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Chat from './Chat'
import './styles.css'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { newMessageInt, reduxStateInt } from '../../usefull/interfaces'

const Home = (props: RouteComponentProps) => {
  const ADDRESS = process.env.REACT_APP_BE_URL!
  const socket = io(ADDRESS, { transports: ['websocket'] })

  const newMessage: newMessageInt | null = useSelector(
    (state: reduxStateInt) => state.chats.newMessage
  )

  useEffect(() => {
    console.log('HELLO THIS IS THE USEEFFECT AT HOME')
    loadHome()
    loadSocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSocket = () => {
    socket.on('connect', () => {
      console.log('Connection established!')
      console.log('🚀SOCKET.ID=>', socket.id)
    })
    socket.on('joinedRoom', () => {
      console.log("Now I've joined the rooms!")
    })
    socket.on('message', (newMessageJustReceived) => {
      console.log("message received! let's post it in the window...")
      console.log(newMessageJustReceived)
    })

    if (newMessage?.status === true) {
      socket.emit('sendmessage', {
        message: newMessage.content,
        room: newMessage._id,
      })
    }
  }

  const loadHome = async () => {
    await getMyProfile()
    console.log('HOME LOADED!')
  }

  const getMyProfile = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      const profile = await response.json()
      console.log('HERE I AM=>', profile)
    } else {
      props.history.push('/login')
    }
  }

  return (
    <div className="home-cont">
      <div className="green-background-line"></div>
      <div className="content-home-cont">
        <Row className="m-0 h-100">
          <Col xs={4} className="side-bar p-0">
            <Sidebar />
          </Col>
          <Col xs={8} className="chat-container p-0">
            <Chat />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home
