import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Moment from 'moment'; // Import momentjs
import StarRating from './StarRating';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
const MyRequestsCard = ({itemData}) => {
  Moment.locale('en');
  const EmergencyType = {
    "accident_reported": "Accident",
    "ambulance_request": "Ambulance",
    "heart_attack": "Heart Attack",
    "blood_donor": "Blood Donor"
  }
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={require('../assets/previewMap.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
        <Text style={styles.time}>{Moment(itemData.requestdate).format('DD-MM-YYYY hh:mma')}</Text>
        <Text style={styles.cardTitle}>{EmergencyType[itemData.requestType]}</Text>
          <Text style={[styles.status],[itemData.requestStatus == 'closed'? styles.closeStatus:styles.activeStatus]}>
            {itemData.requestStatus == 'new' ? 'Active' : 'Closed'}</Text>
       
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyRequestsCard;

const styles = StyleSheet.create({
  time:{ fontSize: 16, color:'#8e8e8e'},
  status:{fontSize: 14},
  closeStatus:{fontSize: 10,
    backgroundColor:'#b1003b',
    color:'#fff',
    padding:3,
    width:100,
    textAlign:'center',
    borderRadius:50},
  activeStatus:{fontSize: 14, 
    backgroundColor:'#1abae8',
    color:'#fff',
    padding:3,
    width:100,
    textAlign:'center',
    borderRadius:50
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 15,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
