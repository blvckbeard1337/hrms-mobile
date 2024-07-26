import {Layout, Text, useTheme} from "@ui-kitten/components";
import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from "../context/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import {DashboardScreen} from "./Dashboard";
import {Settings} from "./Settings";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {HomeDrawer} from "./HomeDrawer";
import {Profile} from "./Profile";
import {AttendanceScreen} from "./Attendance";
import {Terms} from "./Terms";

const Screens = () => {
    const {user} = useAuth()
    const theme = useTheme()

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = 'document-outline';

                    switch (route.name) {
                        case 'Dashboard':
                            iconName = focused ? 'home-outline' : 'home-outline'
                            break;
                        case 'Attendance':
                            iconName = focused ? 'alarm-outline' : 'alarm-outline'
                            break;
                    }

                    return (
                        focused ? (
                            <Ionicons name={iconName} size={size} color={color}/>
                        ) : (
                            <Ionicons name={iconName} size={size} color={color}/>
                        )
                    )
                },
                tabBarStyle: {
                    borderTopColor: theme['border-basic-color-2'],
                    borderTopWidth: 1.5,
                    backgroundColor: theme['background-basic-color-1']
                },
                tabBarShowLabel: false,
            })}
        >
      {/*      <Tab.Screen name="Dashboard"
                        component={DashboardScreen}
            ></Tab.Screen>*/}
            <Tab.Screen name="Attendance"
                        component={AttendanceScreen}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export const HomeScreen = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}
            drawerContent={props => <HomeDrawer {...props} />}>
            <Drawer.Screen name="HR NEXUS" component={Screens}/>
            <Drawer.Screen name="Profile" component={Profile}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="Terms and conditions" component={Terms}/>
        </Drawer.Navigator>
    )
}