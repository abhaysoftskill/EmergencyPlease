import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Animated, ScrollView, View, Text, Image } from 'react-native';
import EmergencyService from '../services/emergencyServices';
import Moment from 'moment'; // Import momentjs
import { Icon } from 'native-base';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const RequestStatus = (props) => {
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  
  return (
  <>  
  <Icon style={styles.scrollViewClose}
    name='close' onPress={() => props.CloseAlert(false)}
/>
    <Animated.ScrollView
      ref={_scrollView}
      horizontal
      pagingEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={true}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
      style={styles.scrollView}
      contentInset={{
        top: 0,
        left: SPACING_FOR_CARD_INSET,
        bottom: 0,
        right: SPACING_FOR_CARD_INSET
      }}
      contentContainerStyle={{
        paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                // x: mapAnimation,
              }
            },
          },
        ],
        { useNativeDriver: true }
      )}
    >
    
      {props.myRequestData.length > 0 && props.myRequestData.map((request, index) => (
      request.requestStatus !== 'closed' &&  <View style={[styles.card]} key={index}>
          <View style={styles.requestNumber}>
            <Text style={{ color: "#fff" }}>1</Text>
          </View>
          <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
          }]}>
            <View style={{ flex: 1}} >
              <View style={{ flexDirection: 'row', }}>
                <View >
                  <View style={{ flexDirection: "column", flexWrap: "wrap", padding: 10, alignItems:'center' }}>

                    <Text style={styles.time}>{Moment(request.updated_at).format('DD-MM-YYYY hh:mma')}</Text>

                    <Text style={[styles.cardTitle], {marginBottom:10}}>{request.services.service_name_alias}</Text>

                    <Text style={[styles.status], [request.requestStatus == 'closed' ? styles.closeStatus : request.requestStatus == 'new' ? styles.newStatus :  styles.activeStatus]}>
                      {request.requestStatus}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "#454" }} >
                  <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                  <Image
                source={{ uri: `https://emergencyplease.com/api/src/uploads/${request.services.service_name}.jpg` }}
                resizeMode="cover"
                style={styles.cardImg}
              />
                  </View>
                </View>

              </View>
            </View>
            <View style={{ flex: 2, padding: 10, backgroundColor:'#000', color:'#fff'  }} >
              <Text style={[styles.cardTitle], {color:'#fff'}}>We'r trying to reach nearest users to get instance help.</Text>

            </View>
            <View style={{ flex: 3, backgroundColor: "green" }} />
          </View>

        </View>

      ))}
    </Animated.ScrollView>
</>
  )
}

export default RequestStatus;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    // marginBottom: 10
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  time: { fontSize: 16, color: '#0c0d0e' },
  status: { fontSize: 14, textTransform: 'capitalize' },
  newStatus: {
    fontSize: 14,
    backgroundColor: '#f66600',
    color: '#fff',
    padding: 5,
    width: 100,
    textAlign: 'center', textTransform: 'capitalize',
    borderRadius: 50
  },
  closeStatus: {
    fontSize: 10,
    backgroundColor: '#b1003b',
    color: '#fff',
    padding: 5,
    width: 100,
    textAlign: 'center', textTransform: 'capitalize',
    borderRadius: 50
  },
  activeStatus: {
    fontSize: 14,
    backgroundColor: '#1abae8',
    color: '#fff',
    padding: 5,
    width: 100,
    textAlign: 'center', textTransform: 'capitalize',
    borderRadius: 50
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: 100,
    width: 120,
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    zIndex: 999,
    // height:150
  },
  scrollViewClose: {
    position: "absolute",
    bottom: 120,
    // left: 0,
    borderWidth:2,
    borderColor:'#fff',
    right: 0,
    paddingVertical: 10,
    zIndex: 99999,
     padding: 0, backgroundColor: '#ccc', borderRadius: 40, margin: 10,
    width:50,
    height:50,justifyContent:'center',
    textAlign:'center',
    alignItems:'center'
  },
  requestNumber: {
    color: "#d21036", position: 'absolute', top: 5, right: 6,
    backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
    alignItems: "center", alignContent: "center", justifyContent: 'center'
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#f7fb03",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    // height: CARD_HEIGHT,
    width: CARD_WIDTH,
    flex: 2, flexDirection: 'row',
    overflow: "hidden",

  },
  cardImage: {
    borderWidth: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    width: 100,
    height: 70,
    borderRadius: 50,
    // flex: 1, flexDirection: 'row',
    marginLeft: 10
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "red",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})