import React, {useContext, useState} from "react"
import {StyleSheet, View, Linking} from "react-native"
import {
    Avatar,
    Divider,
    Drawer,
    DrawerItem,
    Layout,
    Text, useTheme
} from "@ui-kitten/components"
import {useAuth} from "../context/AuthContext";
import {unregisterBackgroundTimer} from "../components/BackgroundNotifications";
import {useTranslation} from "react-i18next";

export const HomeDrawer = ({navigation}) => {
    const theme = useTheme()
    const [selectedIndex, setSelectedIndex] = useState(null)
    const {user, onLogout} = useAuth()
    const {t} = useTranslation()

    const DATA = [
        {
            title: t("Profile"),
            onPress: () => {
                navigation.toggleDrawer()
                navigation.navigate("Profile")
            }
        },
        {
            title: t("Settings"),
            onPress: () => {
                navigation.toggleDrawer()
                navigation.navigate("Settings")
            }
        },
        {
            title: t("Privacy and Policy"),
            onPress: () => {
                Linking.openURL('https://hr-nexus.net/privacy-policy').catch(err => console.error("Failed to open URL: ", err));
                navigation.toggleDrawer();
            }
        },
        {
            title: t("Logout"),
            onPress: async () => {
                navigation.toggleDrawer()
                onLogout()
            }
        }
    ]

    const renderHeader = () => (
        <Layout style={styles.header} level="2">
            <View style={styles.profileContainer}>
                <Avatar
                    size="giant"
                    source={{
                        uri: user?.avatar?.path ?? 'https://i.sstatic.net/l60Hf.png'
                    }}
                />
                <Text style={styles.profileName} category="h6">
                    {user.first_name} {user.last_name}
                </Text>
            </View>
        </Layout>
    )

    const renderFooter = () => (
        <React.Fragment>
            <Divider/>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: 16,
                backgroundColor: theme['background-basic-color-1']
            }}>
                <Text> {new Date().getFullYear()} © HR NEXUS</Text>
            </View>
        </React.Fragment>
    )

    return (
        <Drawer
            header={renderHeader}
            footer={renderFooter}
        >
            {DATA.map((el, index) => (
                <DrawerItem
                    key={index}
                    title={el.title}
                    onPress={el.onPress}
                    accessoryLeft={el.icon}
                />
            ))}
        </Drawer>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    header: {
        height: 128,
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    profileName: {
        marginHorizontal: 16
    }
})
