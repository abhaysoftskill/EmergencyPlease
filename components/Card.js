import { Right } from 'native-base';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import StarRating from './StarRating';

const Card = ({ itemData, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={itemData.service_status === 'coming_soon'}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{ uri: `https://emergencyplease.com/api/src/uploads/${itemData.service_name}.jpg` }}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>

        <View style={[itemData.service_status === 'coming_soon' ? styles.coming_service : itemData.service_status === 'new_service' ? styles.new_service : styles.cardInfo]}>
          {itemData.service_status !== 'active' && itemData.service_status !== 'close' && <View style={styles.serviceStatus}>
            {itemData.service_status === 'coming_soon' && <Image
              source={require(`../assets/coming_soon.png`)}
              resizeMode="contain"
              style={styles.serviceStatusImgComing}
            />}
            {itemData.service_status === 'new_service' && <Image
              source={require(`../assets/new_service.png`)}
              resizeMode="contain"
              style={styles.serviceStatusImg}
            />}
          </View>}
          <Text style={itemData.service_status === 'coming_soon' ? styles.coming_service_text :  styles.cardTitle}>{itemData.service_name_alias}</Text>
         {itemData.service_status !== 'coming_soon' && <StarRating ratings={itemData.ratings} reviews={itemData.reviews} />}
          <Text numberOfLines={2} style={itemData.service_status === 'coming_soon' ? styles.coming_service_desc : styles.cardDetails}>{itemData.service_description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // height: 100,
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  serviceStatus: {
    // flex: 1,
    position: 'absolute',
    zIndex: 999,
    right: 0,
    // borderWidth:1,
    top: -5
  },
  serviceStatusImg: {
    height: 30,
    width: 80,
    alignSelf: 'center',
  },
  serviceStatusImgComing: {
    height: 30,
    width: 80,
    alignSelf: 'center',
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
    borderColor:'#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  coming_service_text: {
    color:'#bbbdc1',
    fontWeight: 'bold',
    fontSize: 20,
  },
  coming_service_desc: {
    fontSize: 12,
    color: '#bbbdc1',
  },
  coming_service: {
    borderColor: '#e4e4e4',
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  new_service: {
    borderColor: '#0693e3',
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  border_color: {
    borderColor: '#ccc',
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  }

});
