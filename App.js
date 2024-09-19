import React, {useContext, useState} from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationProvider, IconRegistry, Layout, Text} from '@ui-kitten/components';
import {LoginScreen} from './src/screens/Login';
import {HomeScreen} from "./src/screens/Home";
import {AuthProvider, useAuth} from "./src/context/AuthContext";
import Toast from 'react-native-toast-message';
import {ThemeContext} from "./src/context/ThemeContext";
import * as Notifications from "expo-notifications";
import {NotificationProvider} from "./src/context/NotificationContext";
import {GeoProvider} from "./src/context/GeoContext";
import * as TaskManager from "expo-task-manager";
import {BACKGROUND_FETCH_TASK, backgroundTask} from "./src/components/BackgroundNotifications";
import {default as themeColors} from './src/theme/colors.json';
import {LoaderProvider} from "./src/context/LoaderContext";
import "./src/localization/i18n";


const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

TaskManager.defineTask(BACKGROUND_FETCH_TASK, backgroundTask);

export default () => {

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };


    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack]}/>
            <ThemeContext.Provider value={{
                theme,
                toggleTheme,
            }}>
                <ApplicationProvider {...eva} theme={{...eva[theme], ...themeColors}}>
                    <NotificationProvider>
                        <GeoProvider>
                            <AuthProvider>
                                <LoaderProvider>
                                    <App/>
                                </LoaderProvider>
                            </AuthProvider>
                        </GeoProvider>
                    </NotificationProvider>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </React.Fragment>
    )
};

export const App = () => {
    const {authState} = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {authState?.authenticated
                    ? (
                        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
                    )
                    : (
                        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
                    )}
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    )
}