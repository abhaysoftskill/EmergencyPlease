import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LocalizationContext } from '../translations/LocalizationContext';

export const LanguageSettingsScreen = ({ navigation }) => {
  const { translations, appLanguage, setAppLanguage } = useContext(
    LocalizationContext,
  );

  const handleSetLanguage = async language => {
    setAppLanguage(language);
    navigation.navigate('SplashScreen')
  };
  const activePhone = '#089bc7';

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* <Text>{translations.BACK}</Text> */}
      </TouchableOpacity>
      {/* <Text style={{ fontSize: 20, textAlign: 'center'}}>
        {translations.LANGUAGE_SETTINGS}
      </Text> */}
      <View
        style={{
          flex: 1,
          flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between', marginTop: 20,
        }}
      >
        {translations.getAvailableLanguages().map(item => (<TouchableOpacity key={item}
          onPress={() => {
            handleSetLanguage(item)
          }}
        >
          <View
            style={[styles.box, {
              backgroundColor: item == 'English' ? '#E9FFEA' : item == 'हिन्दी' ? '#FFEAE9' : item == 'मराठी' ? '#FEF4EA' : '#E8EEFE',
              width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
            }]}
          >

            <Text style={[{
              flexShrink: 1,
              color: activePhone, fontSize: 15, textAlign: 'center', marginRight: 10
            }]}>{item}
              {appLanguage === item ? (
                <Text style={{ paddingLeft: 30 }}>√</Text>
              ) : null}</Text>
          </View>

        </TouchableOpacity>
        ))}
        <View
          style={[styles.box, {
            backgroundColor: '#eae7e7',
            width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
          }]}
        >

          <Text style={[{
            flexShrink: 1,
            color: '#9c9999', fontSize: 15, textAlign: 'center', marginRight: 10
          }]}>हिन्दी
            </Text>
        </View>

        <View
          style={[styles.box, {
            backgroundColor: '#eae7e7',
            width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
          }]}
        >

          <Text style={[{
            flexShrink: 1,
            color: '#9c9999', fontSize: 15, textAlign: 'center', marginRight: 10
          }]}>मराठी
            </Text>
        </View>

        <View
          style={[styles.box, {
            backgroundColor: '#eae7e7',
            width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
          }]}
        >

          <Text style={[{
            flexShrink: 1,
            color: '#9c9999', fontSize: 15, textAlign: 'center', marginRight: 10
          }]}>ગુજરતી
            </Text>
        </View>
        <View
          style={[styles.box, {
            backgroundColor: '#eae7e7',
            width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
          }]}
        >

          <Text style={[{
            flexShrink: 1,
            color: '#9c9999', fontSize: 15, textAlign: 'center', marginRight: 10
          }]}>ਪੰਜਾਬੀ</Text>
        </View>
        <View
          style={[styles.box, {
            backgroundColor: '#eae7e7',
            width: 150, height: 80, alignItems: 'center', justifyContent: 'center'
          }]}
        >

          <Text style={[{
            flexShrink: 1,
            color: '#9c9999', fontSize: 15, textAlign: 'center', marginRight: 10
          }]}>తెలుగు
            </Text>
        </View>
      </View>


    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    // width: 50,
    alignContent: "space-around",
    // height: 50,
    margin: 5
  },
})