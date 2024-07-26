import {Button, Card, Icon, Layout, Text, TopNavigation, TopNavigationAction, useTheme} from "@ui-kitten/components";
import React, {useContext, useEffect, useState} from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {AppState, Pressable} from "react-native";
import {WorkScheduleScreen} from "./WorkSchedule";
import {NavigationMenu} from "../components/NavigationMenu";
import {SafeAreaLayout} from "../components/SafeAreaLayout";
import axios from "axios";
import {AttendanceContext, AttendanceProvider} from "../context/AttendanceContext";
import {NotificationContext} from "../context/NotificationContext";
import {GeoContext} from "../context/GeoContext";
import Toast from "react-native-toast-message";
import {unregisterBackgroundTimer, registerBackgroundTimer} from "../components/BackgroundNotifications"
import AsyncStorage from "@react-native-async-storage/async-storage";

const AttendanceStack = createStackNavigator();

export const AttendanceScreen = () => (
    <AttendanceProvider>
        <AttendanceStack.Navigator>
            <AttendanceStack.Screen options={{headerShown: false}} name="attendance.index" component={Home}/>
            <AttendanceStack.Screen options={{headerShown: false}} name="attendance.work_schedule"
                                    component={WorkScheduleScreen}/>
        </AttendanceStack.Navigator>
    </AttendanceProvider>
)


const Home = ({navigation}) => {
    const {store, buttons, setButtons, fetch} = useContext(AttendanceContext)
    const {pushNotification} = useContext(NotificationContext)
    const {getCurrentLocation} = useContext(GeoContext)

    const theme = useTheme();

    const toggleActive = async (index) => {
        if (buttons.find((el, i) => (el.active && i !== index && i !== 0))) {
            return;
        }

        let location = await getCurrentLocation();

/*        if (location === null) {
            Toast.show({
                type: 'error',
                text1: 'Permissions',
                text2: 'Enable location for this app for attendance to work.'
            })
            return;
        }*/

        if (index === 0 && buttons[0].active) {
            store(index, !buttons[index].active ? 0 : 1, location).then(async res => {
                setButtons(el => el.map(button => ({
                    ...button,
                    duration: 0,
                    active: false,
                    time: convertSeconds(0)
                })))

                await AsyncStorage.removeItem("notification")
            }).catch((e) => console.error(e))
        } else {
            store(index, !buttons[index].active ? 0 : 1, location).then(res => {
                setButtons(prevButtons =>
                    prevButtons.map((button, i) =>
                        i === index
                            ? {...button, active: !buttons[index].active}
                            : index === 0 && !buttons[index].active
                                ? {...button, active: false}
                                : button
                    )
                );
            }).catch((e) => console.error(e))
        }
    }

    useEffect(() => {
        const load = () => fetch()
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === 'background') {
                await registerBackgroundTimer();
            } else if (nextAppState === 'active') {
                await unregisterBackgroundTimer()
                fetch()
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        load()

        return () => {
            subscription.remove();
        };
    }, []);


    useEffect(() => {
        const intervals = [];

        buttons.forEach((button, index) => {
            if (button.active) {
                const interval = setInterval(() => {
                    if (index === 0 && button.duration === 300) {
                        pushNotification("Overtime!", "You're working in overtime session.")
                    }

                    if (index === 1 && button.duration === 100) {
                        pushNotification("Alert", "You have already used your break")
                    }

                    setButtons(prevButtons =>
                        prevButtons.map((button, i) =>
                            i === index ? {
                                ...button,
                                duration: button.duration + 1,
                                time: convertSeconds(button.duration + 1)
                            } : button
                        )
                    );
                }, 1000)
                intervals.push(interval);
            }
        })

        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, [toggleActive]);

    const convertSeconds = (totalSeconds) => {
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    };

    const pad = (int) => {
        if (int < 10) {
            return '0' + int;
        }

        return int;
    }

    const calendarIcon = (props) => (
        <Icon
            {...props}
            name='calendar-outline'
        />
    );

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation}/>
            <Layout style={{padding: 15, alignItems: 'center'}}>
                <Text category="h3">Attendance</Text>
                <Text category="p1">{`${new Date().toLocaleDateString('en-EN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}`}</Text>
                <Button
                    accessoryLeft={calendarIcon}
                    onPress={() => navigation.navigate('attendance.work_schedule')}
                    size="small"
                    status="basic"
                    style={{
                        width: '100%',
                        marginTop: 15,
                    }}
                >
                    Weekly Schedules
                </Button>

                <Layout style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    flexShrink: 1,
                    justifyContent: 'center',
                    marginTop: 30,
                    alignItems: 'flex-start'
                }}>
                    {buttons.map((button, key) => {
                        let color = 'warning';

                        if (key > 0 && !buttons[0].active) {
                            return;
                        }

                        if (key === 0) {
                            button.title = button.active ? 'Mbaro punën' : 'Fillo punën';
                        }

                        if (key === 1) {
                            button.title = button.active ? 'Mbaro pauzën' : 'Fillo pauzën';
                        }

                        if (key === 2) {
                            button.title = button.active ? 'Kthim zyrtare' : 'Dalje zyrtare';
                        }

                        if (key === 3) {
                            button.title = button.active ? 'Kthim private' : 'Dalje private';
                        }

                        if (button.active) {
                            color = 'primary';
                        }

                        return (
                            <Pressable
                                key={key}
                                onPress={() => toggleActive(key)}
                                style={{
                                    width: button.active || key === 0 ? 171 : 151,
                                    height: 173,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: button.active ? theme['color-success-500'] : theme['color-danger-500'],
                                    margin: 5,
                                    borderRadius: 12,
                                }}
                            >

                                <Text style={{
                                    marginTop: 15,
                                    color: "white"
                                }}> {button?.time ?? '00:00:00'}</Text>

                                <Icon
                                    name={button.icon}
                                    fill='white'
                                    style={{
                                        width: 90,
                                        height: 90,
                                    }}
                                />

                                <Layout style={{
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color: "white"
                                    }}>
                                        {button.title}
                                    </Text>
                                    <Icon
                                        name={!button.active ? 'play-circle-outline' : 'pause-circle-outline'}
                                        fill={!button.active ? theme['color-success-500'] : theme['color-danger-500']}
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </Layout>

                            </Pressable>
                        )
                    })}
                </Layout>
            </Layout>
        </SafeAreaLayout>
    )
}