import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import socketIOClient from "socket.io-client";
import { createStackNavigator } from 'react-navigation';


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "https://www.aklogical.com";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();
  
    useEffect(() => {
      
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId },
      });
      
      // Listens for incoming messages
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id,
        };
        setMessages((messages) => [...messages, incomingMessage]);
      });
      
      // Destroys the socket reference
      // when the connection is closed
      return () => {
        socketRef.current.disconnect();
      };
    }, [roomId]);
  
    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody) => {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
      });
    };
  
    return { messages, sendMessage };
  };
  
  export default useChat;

// export default class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     this.id = this.makeid();
//     this.state = {
//       isLoading: true,
//       myPosition: {
//         latitude: 0,
//         longitude: 0,
//         timestamp: 0,
//       },
//       friends: {},
//     };
//     this.socket = io.connect('http://625809ac.ngrok.io');
//   }

//   makeid() {
//     var text = '';
//     var possible =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < 5; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
//   }

//   componentDidMount() {
//     //   this.watchId = navigator.geolocation.watchPosition(
//     //     (position) => {
//     //       this.socket.emit('position', {
//     //         data: position,
//     //         id: this.id
//     //       })

//     //       let tempPosition = {...this.state.myPosition};
//     //       tempPosition.latitude = position.coords.latitude
//     //       tempPosition.longitude = position.coords.longitude

//     //       this.setState({
//     //         myPosition: tempPosition,
//     //         isLoading: false
//     //       });
//     //     },
//     //     (error) => console.log(error),
//     //     { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
//     //   );
//     // }

//     navigator.geolocation.getCurrentPosition(
//       position => {
//         // console.log('position===========================', position)
//         this.socket.emit('position', {
//           data: position,
//           id: this.id,
//         });

//         let tempPosition = { ...this.state.myPosition };
//         tempPosition.latitude = position.coords.latitude;
//         tempPosition.longitude = position.coords.longitude;

//         this.setState({
//           myPosition: tempPosition,
//           isLoading: false,
//         });
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 }
//     );
//   }

//   // componentWillUnmount() {
//   //   navigator.geolocation.clearWatch(this.watchId);
//   // }

//   static navigationOptions = {
//     title: 'Map',
//     headerStyle: {
//       backgroundColor: '#4f9b94',
//     },
//     headerTintColor: '#fff',
//   };

//   render() {
//     this.socket.on('otherPositions', positionsData => {
//       // console.log('positionsData from server broadcast')
//       let tempFriends = { ...this.state.friends };
//       tempFriends[positionsData.id] = { ...positionsData };

//       this.setState({
//         friends: tempFriends,
//       });
//     });
//     // console.log('state friends ----------------', this.state.friends)

//     let friendsPositionsArr = Object.values(this.state.friends);
//     // console.log('friendsPositionsArr', friendsPositionsArr)

//     let myLat = this.state.myPosition.latitude;
//     let myLong = this.state.myPosition.longitude;

//     const coords = {
//       latitude: myLat,
//       longitude: myLong,
//     };
//     const myMetadata = `ME!`;

//     return (
//       <View
//         style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
//       >
//         {this.state.isLoading ? (
//           <Text>loading...</Text>
//         ) : (
//           <MapView
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//             }}
//             region={{
//               latitude: myLat,
//               longitude: myLong,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//           >
//             <MapView.Marker
//               coordinate={coords}
//               timestamp={this.state.myPosition.timestamp}
//               description={myMetadata}
//             />

//             {friendsPositionsArr.map(marker => {
//               // console.log('state friends ----------------', this.state.friends)
//               const friendsCoords = {
//                 latitude: marker.data.coords.latitude,
//                 longitude: marker.data.coords.longitude,
//               };

//               const metadata = `id: ${marker.id}`;

//               return (
//                 <MapView.Marker
//                   key={marker.id}
//                   coordinate={friendsCoords}
//                   timestamp={marker.data.timestamp}
//                   description={metadata}
//                   title={marker.id}
//                 />
//               );
//             })}
//           </MapView>
//         )}
//       </View>
//     );
//   }
// }

// export const MapStack = createStackNavigator({
//   Profile: { screen: Profile },
// });