import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import StarRating from '../../components/StarRating';

const EmerContactCard = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.name}  </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EmerContactCard;

const styles = StyleSheet.create({
  card: {
    height: 50,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems:'center',
    textAlignVertical:'center'
  },
 
  cardInfo: {
    flex: 1,
    padding: 10,
  
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardDetails: {
    fontSize: 24,
    color: '#444',
  },
});
