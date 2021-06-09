import React, { useEffect, useState } from 'react';
import {
    Container, List, ListItem, Left, Right,
    Thumbnail, Body, Badge, Text, View, Icon

} from 'native-base';
import styles from '../../model/notify';
import notifyData from '../../model/StoriesJson';
import { Modal, Dimensions, Alert, Pressable } from 'react-native';
import { Divider, Paragraph } from 'react-native-paper';
import EmergencyService from '../../services/emergencyServices';
import Moment from 'moment';
export const Notifications = ({ navigation }) => {
    const [notificationID, setNotificationID] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        EmergencyService.notifications().then((res) => {
            console.log(res)
            setNotifications(res.notifications);
        }, error => {
            return;
        })
        const unsubscribe = navigation.addListener("focus", () => {
            setNotifications([])
        })

        // this will help to clear the state when navigate the screen
        return unsubscribe;
    }, [navigation])

    const closeModal = () => {
        setModalVisible(false)
    }

    const openModal = () => {
        setModalVisible(true)
    }
    return (
        <Container>
           {notifications?.length > 0 && <List
                dataArray={notifications}
                renderRow={(notification, index) =>
                    <ListItem avatar key={index} onPress={() => { openModal(), setNotificationID(index) }}>
                        <Left>
                            <Thumbnail source={require('../../assets/defaultProfile.png')} />
                        </Left>
                        <Body style={[styles.bodySection]}>
                            <Text style={styles.userName}>{notification.notificationTitle}</Text>
                            <Text style={styles.timeSpan}>{Moment(notification.updated_at).local().calendar()}</Text>
                            <Text style={styles.userDesc} numberOfLines={1}>{notification.notificationDesc}</Text>
                        </Body>
                        <Right style={[styles.rightSection]}>

                        </Right>
                    </ListItem>
                }
                keyExtractor={(item) => item._id}

            />}

            <Text style={{textAlign:'center', marginTop:50, color:'#d40707'}}> ---------- No Notification ---------</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.userName}>{notifications[notificationID]?.notificationTitle}</Text>
                        <Divider />
                        <Paragraph style={styles.modalText}>{notifications[notificationID]?.notificationDesc}</Paragraph>
                        <Icon style={{ position: 'absolute', top: 0, right: 0, padding: 2, backgroundColor: '#ccc', borderRadius: 50, margin: 10 }}
                            name='close' onPress={() => setModalVisible(!modalVisible)}
                        />
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable> */}
                    </View>
                </View>
            </Modal>
        </Container>



    )
}