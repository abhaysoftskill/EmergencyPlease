import { Platform } from "react-native";


const notify = {
  timeSpan:{
    color:'#ccc',
    fontSize:12,
    paddingBottom:5
  },

    userName: {
        fontWeight: 'bold',
        paddingBottom: 0
    },
    userDesc: {
        fontSize: 12
    },
    lastchat: {
        fontSize: 12,
    },
    bodySection: {
        alignSelf: 'flex-end'

    },
    rightSection: {
        paddingBottom: 0,

        paddingTop: Platform.OS === 'ios' ? 0 : 12
    },
    time: {
        color: '#f53d3d'
    },
    badgeSection: {
        backgroundColor: '#f53d3d',
        width: 25,
        height: 25,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 3,
        alignSelf: 'flex-end',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "left"
      }
}

export default notify;