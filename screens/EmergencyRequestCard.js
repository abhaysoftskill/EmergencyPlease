import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const EmergencyRequestCard = ({ itemData, RequestDataCount, onPress }) => {
  return (

    <TouchableOpacity onPress={onPress}
    >
      <View style={[styles.card, RequestDataCount[itemData.name] > 0 ? styles.active : styles.inActive]}>
        <View style={styles.cardImgWrapper}>
          <View style={[styles.categoryIcon, RequestDataCount[itemData.name] > 0 ? styles.active : styles.inActive]}>
            <Text style={[styles.count, RequestDataCount[itemData.name] > 0 ? styles.active : styles.inActive]} color="green">{RequestDataCount[itemData.name]}</Text>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, RequestDataCount[itemData.name] > 0 ? styles.active : styles.inActive]}>
            {itemData.title}
          </Text>
          <Text numberOfLines={1}
            style={[styles.cardDetails, RequestDataCount[itemData.name] > 0 ? styles.active : styles.inActive]}>
            {itemData.description}
          </Text>

        </View>
        <View style={styles.cardImgWrapper}>
          <Image
            source={itemData.image}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EmergencyRequestCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    width: '100%',
    alignSelf: 'center',

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: '#fff',
    // elevation: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomWidth: 2,

  },
  active: {
    borderBottomColor: 'green', color: 'green',
    borderColor: 'green'
  },
  inActive: {
    borderBottomColor: '#e5e5e5', color: '#e5e5e5',
    borderColor: '#e5e5e5'
  },
  categoryIcon: {
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    // backgroundColor: 'green' /* '#FF6347' */,
    borderRadius: 50,

  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  count: {

    fontSize: 20,

  },
  cardDetails: {
    fontSize: 12,
    color: 'green',
  },
});
