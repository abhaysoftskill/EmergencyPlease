const covidCenterModal = {
  title: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    maxWidth:330,padding:10,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    maxWidth:245,
  },
  feedbackAction: {
    padding: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#05375a',
    letterSpacing: '12px'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 400,
  //  width: 330,
    maxWidth:330,
    // margin: 5,
    // backgroundColor: 'rgba(0,198,66,0.35)',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20
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
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left"
  }
}

export default covidCenterModal;