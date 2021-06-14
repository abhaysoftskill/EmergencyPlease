import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';

const PhoneContactCard = ({itemData, onPress}) => {
  const {
    itemContainer,
    leftElementContainer,
    rightSectionContainer,
    mainTitleContainer,
    rightElementContainer,
    rightTextContainer,
    titleStyle,
    descriptionStyle
  } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.displayName}  </Text>
        </View>
       
      </View> */}
       
          <View style={itemContainer}>
          <View style={leftElementContainer}>
          <Avatar
                    img={
                      itemData.hasThumbnail
                        ? { uri: itemData?.thumbnailPath }
                        : undefined
                    }
                    placeholder={getAvatarInitials(
                      `${itemData.displayName}`
                    )}
                    width={40}
                    height={40}
                  />
          </View>
            <View style={rightSectionContainer}>
              <View style={mainTitleContainer}>
                <Text style={titleStyle}>{itemData.displayName}</Text>
                {/* {phoneNumbers ? phoneNumbers.map((phone_number, index) => (
                  <Text key={index} style={descriptionStyle}>{phone_number.number}</Text>

                )) : (
                  <View />
                )} */}
                  {itemData.phoneNumbers.length > 0 ?  <Text style={descriptionStyle}>{itemData.phoneNumbers[0].number}</Text> : (
                  <View />
                )}
              </View>
              <View style={rightTextContainer}>
                {/* {rightText ? <Text>{rightText}</Text> : <View />} */}
                {/* <Button mode={'outlined'} color={'green'}  labelStyle={{ marginRight: 10, fontSize: 10}} onPress={() => { setVerifyLoading(true), resendEmailVerifiy() }}>Share Link</Button> */}
                <Text style={{marginRight: 12, fontSize: 10, backgroundColor:'green', 
                textAlign:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:50, color:'#fff'}}>Share App</Text>
              </View>

              {/* {rightElement ? (
                <View style={rightElementContainer}>{rightElement}</View>
              ) : (
                <View />
              )} */}
            </View>
           
          </View>
     
    </TouchableOpacity>
  );
};

export default PhoneContactCard;

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
  itemContainer: {
    flexDirection: "row",
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    paddingLeft: 13,

  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: "row",
    flex: 20,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#515151",

  },
  mainTitleContainer: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
   
  },
  rightTextContainer: {
    justifyContent: "center",
    alignItems:"center",
    alignContent:"center",
    
  },
  titleStyle: {
    fontSize: 16
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#515151"
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

const getAvatarInitials = textString => {
  if (!textString) return "";
  const text = textString.trim();
  const textSplit = text.split(" ");

  if (textSplit.length <= 1) return text.charAt(0);

  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

  return initials;
};