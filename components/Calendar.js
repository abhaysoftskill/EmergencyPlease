import React, { useState } from 'react';
import {
    StyleSheet, Text, Modal, View
} from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import Moment from 'moment';
import DatePicker from 'react-native-datepicker';

const DateCalendar = (props) => {
    let dateFormat = require("dateformat");
    const [selected, setSelected] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [calenderVisible, setCalenderVisible] = useState(false);
    const [date, setDate] = React.useState(new Date());
    let minDate = Moment.utc(new Date(), "DD-MM-YYYY").subtract(80, 'years').format()
    const onDayPress = day => {
        setSelected(day.dateString)
        setSelectedDate(dateFormat(new Date(day.dateString), "dd-mm-yyyy"));
    };
    const hideDialog = () => setVisible(false);
    return (
        <Provider>
            <Portal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={props.showCalendar}
                    onRequestClose={() => {
                        props.closeOption()
                    }}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Date</Text>
                            {/* <Calendar
                            max={new Date()}
                                date={date}
                                onSelect={nextDate => setDate(nextDate)}
                            /> */}
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={date} // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                // minDate="01-01-2016"
                                // maxDate="01-01-2019"
                                // current={Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('YYYY-MM-DD')}
                                minDate={Moment(new Date(), "DD-MM-YYYY").subtract(80, 'years').format('DD-MM-YYYY')}
                                maxDate={Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('DD-MM-YYYY')}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        //display: 'none',
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    },
                                }}
                                onDateChange={(date) => {
                                    setDate(date);
                                }}
                            />
                            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 30 }} onPress={() => { props.closeOption() }}>Cancel</Button>
                                <Button mode={'contained'} color={'#17841c'} style={{ width: 100 }} onPress={() => { props.selectDate(selectedDate) }}>Ok</Button>
                            </View>
                        </View>
                    </View>

                </Modal>

            </Portal>
        </Provider>

    );
};

export default DateCalendar;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {

        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
