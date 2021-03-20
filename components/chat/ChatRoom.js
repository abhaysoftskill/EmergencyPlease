import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

// import "./ChatRoom.css";
import useChat from "./useChat";

const ChatRoom = ({route,navigation}) => {
  const { roomId } = route.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
      console.log(event)
    setNewMessage(event);
  };

  const handleSendMessage = () => {
      console.log(newMessage)
    sendMessage(newMessage);
    setNewMessage("");
  };
  const makeid =() => {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  return (
    <View className="chat-room-container">
      {messages.map((message, i) => (
            <Text
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </Text>
          ))}
      <TextInput
        value={newMessage}
        onChangeText={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <Button onPress={handleSendMessage} className="send-message-button">
        Send
      </Button>
    </View>
  );
};

export default ChatRoom;