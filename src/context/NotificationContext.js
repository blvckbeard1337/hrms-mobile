import {createContext, useEffect, useState, useRef} from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Platform} from "react-native";

export const NotificationContext = createContext({});

export const NotificationProvider = ({children}) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    async function pushNotification(title, body) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
            },
            trigger: {
                seconds: 1,
            }
        });
    }

    return <NotificationContext.Provider value={{
        pushNotification
    }}>
        {children}
    </NotificationContext.Provider>
}