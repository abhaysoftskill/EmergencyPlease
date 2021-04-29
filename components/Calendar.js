import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    StyleSheet
} from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import Moment from 'moment';
const DateCalendar = (props) => {
    let dateFormat = require("dateformat");
    console.log(Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('YYYY-MM-DD'))
    const [selected, setSelected] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showMarkedDatesExamples, setShowMarkedDatesExamples] = useState(false);

    const onDayPress = day => {
        setSelected(day.dateString)
        setSelectedDate(dateFormat(new Date(day.dateString), "dd-mmm-yyyy"));
    };
    const hideDialog = () => setVisible(false);
    return (
        <Provider>
            <Portal>
                <Dialog visible={true} onDismiss={hideDialog} dismissable={false}>
                    <Dialog.Content >
                        <CalendarList
                            //   style={styles.calendar}
                            //   hideExtraDays
                            onDayPress={onDayPress}
                            current={new Date()}
                            minDate={'2012-05-10'}
                            maxDate={Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('YYYY-MM-DD')}
                            enableSwipeMonths={true}
                            disableMonthChange={false}
                            markedDates={{
                                [selected]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedColor: 'orange',
                                    selectedTextColor: '#fff'
                                }
                            }}

                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 30 }} onPress={() => { props.closeOption() }}>Cancel</Button>
                        <Button mode={'contained'} color={'#17841c'} style={{ width: 100 }} onPress={() => {props.selectDate(selectedDate) }}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>

    );
};

export default DateCalendar;

const styles = StyleSheet.create({

});
