import React from 'react';
import Chatkit, { TokenProvider } from '@pusher/chatkit';
import './App.css';
import MessageList from './Components/MessageList';
import NewRoomForm from './Components/NewRoomForm';
import RoomList from './Components/RoomList';
import SendMessageForm from './Components/SendMessageForm';
import { tokenUrl , instanceLocator } from './config.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.roomCreation = this.roomCreation.bind(this)
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'Robert Vaccaro',
        tokenProvider: new TokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
    })
    .catch(err => console.log("error on connecting: ", err))
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log("error on joinableRooms: ", err))
  }


  subscribeToRoom(roomId) {
    this.setState({
      message: []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 20,
      hooks: {
        onNewMessage: message => {
          this.setState({
            message: [...this.state.messages, message]
          })
        }
        }
    })
    .then(room => {
      this.setState({
        room
      })
      this.getRooms()
    })
    .catch(err => console.log("error on subscribing to room: ", err))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  roomCreation(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("error with createRoom: ", err))
  }


  render() {
    return(
      <div className='app'>
        <RoomList
        roomId={this.state.roomId} 
        subscribeToRoom={this.subscribeToRoom} 
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList 
        roomId={this.state.roomId}
        messages={this.state.messages} />
        <SendMessageForm 
        disabled={!this.state.roomId}
        sendMessage={this.sendMessage} />
        <NewRoomForm roomCreation={this.roomCreation} />
      </div>
    );
  }
}
export default App;
