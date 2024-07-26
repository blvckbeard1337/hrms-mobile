import {createContext, useState} from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

export const AttendanceContext = createContext({});
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AttendanceProvider = ({children}) => {
    const [buttons, setButtons] = useState([
        {title: 'Fillo punën', duration: 0, active: false, icon: 'briefcase-outline'},
        {title: 'Fillo pauzën', duration: 0, active: false, icon: 'gift-outline'},
        {title: 'Dalje zyrtare', duration: 0, active: false, icon: 'people-outline'},
        {title: 'Dalje private', duration: 0, active: false, icon: 'eye-off'},
    ]);

    const [schedule, setSchedule] = useState([]);

    const fetch = async () => {
        await axios.get(`${API_URL}/attendance/current`)
            .then(({data}) => {
                if (data.data[0])
                    data.data[0].forEach((item, key) => {
                        setButtons(prevButtons =>
                            prevButtons.map((button, i) =>
                                i === item.type
                                    ? {
                                        ...button,
                                        active: true,
                                        duration: Math.round((new Date() - new Date(item.check)) / 1000)
                                    }
                                    : button
                            )
                        );
                    })
            })
    }

    const store = async (type, check_type, location) => {
        await axios.post(`${API_URL}/attendance/store`, {
            ...location, ...{
                "type": type,
                "check_type": check_type,
            }
        })
            .then(({data}) => {
                Toast.show({
                    'type': 'success',
                    'text1': 'Congrats',
                    'text2': 'Timer has been ' + (check_type === 0 ? 'started' : 'stopped'),
                })

                if (data.data.flags) data.data.flags.forEach(el => {
                    let title = "";

                    switch (el['flag']) {
                        case 1:
                            title = "You have checked in after your working time has stared";
                            break;
                        case 4:
                            title = "You have checked after your working time has ended";
                            break;
                        case 5:
                            title = "You have checked in outside work location";
                            break;
                        case 6:
                            title = "You have checked out outside work location";
                            break;
                    }

                    if (title !== "") setTimeout(() => Toast.show({
                        'type': 'info',
                        'text1': 'Warning',
                        'text2': title,
                    }), 1500)
                })
            })
            .catch((err) => {
                Toast.show({
                    'type': 'error',
                    'text1': 'Error!',
                    'text2': 'Something went wrong',
                })

                console.error("Axios request failed", err.response?.data, err.toJSON());

                throw err;
            })
    }


    const fetchSchedule = async (user_id, date) => {
        Date.prototype.GetFirstDayOfWeek = function () {
            return (new Date(this.setDate(this.getDate() - this.getDay() + (this.getDay() === 0 ? -6 : 1))));
        }

        Date.prototype.GetLastDayOfWeek = function () {
            return (new Date(this.setDate(this.getDate() - this.getDay() + 7)));
        }

        Date.prototype.addTime = function (timeStr) {
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);
            this.setHours(this.getHours() + hours);
            this.setMinutes(this.getMinutes() + minutes);
            this.setSeconds(this.getSeconds() + seconds);
            return this;
        };

        const formatDate = date => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        await axios.get(`${API_URL}/work-schedule`, {
            params: {
                "filter[0][key]": 'day',
                "filter[0][op]": 'betweenDate',
                "filter[0][value]": `${formatDate(date.GetFirstDayOfWeek())}, ${formatDate(date.GetLastDayOfWeek())}`,
                "filter[1][key]": 'user_id',
                "filter[1][op]": 'equal',
                "filter[1][value]": user_id,
            },
        })
            .then(({data}) => {
                let events = data.data;

                setSchedule(data.data.map((event, key) => {
                    let day = new Date(event.day);
                    let day_string = day.toLocaleString('en-us', {weekday: 'long'});

                    if (!event.template) {
                        if (!event.start_time && !event.end_time) {
                            return null;
                        }

                        return {
                            'title': `Work ${day_string}`,
                            'start': new Date(day).addTime(event.start_time),
                            'end': new Date(day).addTime(event.end_time),
                        };
                    }

                    let from = event.template[day_string.toLowerCase() + '_from'];
                    let to = event.template[day_string.toLowerCase() + '_to'];

                    if (!from || !to) {
                        return null;
                    }

                    return {
                        'title': `Work ${day_string}`,
                        'start': new Date(day).addTime(from),
                        'end': new Date(day).addTime(to),
                    };
                }).filter(Boolean))
            })
    }

    return <AttendanceContext.Provider value={{
        buttons,
        setButtons,
        fetch,
        store,
        schedule,
        fetchSchedule
    }}>{children}</AttendanceContext.Provider>

}