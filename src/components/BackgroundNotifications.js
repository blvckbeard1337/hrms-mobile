import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_FETCH_TASK = 'notifications';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = "jwt"

const backgroundTask =  async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)

    if (token) {
        const settings = await AsyncStorage.getItem('attendance').then(data => JSON.parse(data))

        if (settings)
            await axios.get(`${API_URL}/attendance/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            }).then(async ({data}) => {
                if (data.data[0])
                    for (const item of data.data[0]) {
                        const key = data.data[0].indexOf(item);
                        let duration = Math.round((new Date() - new Date(item.check)) / 60000);
                        let notification = await AsyncStorage.getItem('notification');

                        notification = !notification ? [] : JSON.parse(notification);

                        if (duration >= (8 * 60) && item.type === 0 && !notification.includes(item.type)) {
                            notification.push(item.type)
                            await AsyncStorage.setItem('notification', JSON.stringify(notification));
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: "Attendance",
                                    body: 'You have started working overtime now',
                                },
                                trigger: {seconds: 2},
                            });
                        }

                        if (duration >= settings.break_time_duration && item.type === 1 && !notification.includes(item.type)) {
                            notification.push(item.type)
                            await AsyncStorage.setItem('notification', JSON.stringify(notification));
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: "Attendance",
                                    body: `You have already used your break, which is ${settings.break_time_duration} minutes`
                                },
                                trigger: {seconds: 2},
                            });
                        }
                    }
            })
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
}

async function registerBackgroundTimer() {
    try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 60, // seconds
        })
        console.log("Task registered")
    } catch (err) {
        console.log("Task Register failed:", err)
    }
}

async function unregisterBackgroundTimer() {
    try {
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
        console.log("Task unregistered")
    } catch (err) {
        console.log("Task unregister failed:", err)
    }
}

export {registerBackgroundTimer, unregisterBackgroundTimer, backgroundTask, BACKGROUND_FETCH_TASK}