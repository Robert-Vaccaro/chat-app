import React from 'react';
import Chatkit from '@pusher/chatkit';
import './App.css';
import MessageList from './Components/MessageList';
import { tokenUrl , instanceLocator } from './config.js'


class App extends React.Component {
  componentDidMount() {
    const chatManager = new Chatkit.chatManager({
        instanceLocator,
        userId: 'Robert Vaccaro',
        tokenProvider: new Chatkit.tokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 'bc682b05-9b4b-4245-bff6-b651f3bb36d8',
        messageLimit: 20,
        hooks: {
          onNewMessage: message => {
            //26:10
          }
          }
      })
    })
  }

  render() {
    return(
      <div className='app'>
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}
export default App;
