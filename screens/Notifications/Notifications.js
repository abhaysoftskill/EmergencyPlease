import React, { useEffect, useState } from 'react';
import {
    Container, List, ListItem, Left, Right,
    Thumbnail, Body, Badge, Text, View

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
    const [, setServiceName] = useState('')
    useEffect(() => {
        EmergencyService.notifications().then((res) => {
            setNotifications(res.notifications);
        }, error => {
            return;
        })
        const unsubscribe = navigation.addListener("focus", () => {
            setServiceName('')
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
            <List
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

            />
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
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Container>



    )
}