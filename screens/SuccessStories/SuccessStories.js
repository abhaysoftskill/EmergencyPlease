import React, { useEffect, useState } from 'react';
import { Image } from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Footer,
    Input,
    View,

} from 'native-base';
import styles from '../../model/Styles';
import instaData from '../../model/StoriesJson';
import EmergencyService from '../../services/emergencyServices';

export const SuccessStories = ({navigation}) => {
    const[stories, setStories] = useState([])
    const [, setServiceName] = useState('')
    useEffect(() => {
        EmergencyService.stories().then((res) => {
            setStories(res.stories);
      }, error => {
          return;
      })
      const unsubscribe = navigation.addListener("focus", () => {
          setServiceName('')
        })
        
        // this will help to clear the state when navigate the screen
        return unsubscribe;
      }, [navigation])
    return (
        <View>
            {/* https://medium.com/enappd/how-to-make-stories-ui-like-instagram-and-whatsapp-in-react-native-3e84abac6ee9 */}
            {/* https://github.com/mdshadman/InstaWhatsAppStories/blob/master/App/Components/Styles.js */}
        {/* <Text>{JSON.stringify(stories)}</Text> */}
            
            {stories && stories?.map((story, index) => {
                return (
                    <Card style={styles.cardStyle} key={index}>
                        <CardItem style={styles.profileView}>
                            <Left style={styles.flexFour}>
                                <View style={styles.cardavatarContent}>
                                    <View style={styles.cardavatarImageView}>
                                        <Thumbnail source={require('../../assets/defaultProfile.png')} style={styles.thumbImg} />
                                    </View>
                                </View>
                                <Body>
                                    <Text style={styles.fontWeightStyle}>{story?.User[0]?.firstname || 'unknown'} {story?.User[0]?.lastname}</Text>
                                    <Text style={styles.userDesc} numberOfLines={1}>@ {story?.User[0]?.username || 'unknown' }</Text>
                                </Body>
                            </Left>

                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>
                                     {story?.story}
                                </Text>
                            </Body>
                        </CardItem>

                    </Card>
                );
            })}
        </View>



    )
}