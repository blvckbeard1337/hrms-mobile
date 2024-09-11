import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {NavigationMenu} from "../components/NavigationMenu";
import {Avatar, Layout, useTheme, Text, List, ListItem, Icon} from "@ui-kitten/components";
import {useAuth} from "../context/AuthContext";
import React from "react";
import {ImageBackground} from "react-native";
import {useTranslation} from "react-i18next";

export const Profile = ({navigation}) => {
    const {user} = useAuth();
    const theme = useTheme();
    const {t} = useTranslation()

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t("Profile")}/>
            <Layout
                style={{
                    backgroundColor: theme['background-basic-color-2'],
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: 15,
                }}
            >
                <Avatar
                    size="giant"
                    source={{
                        uri: user?.avatar?.path ?? 'https://i.sstatic.net/l60Hf.png'
                    }}
                    style={{
                        marginRight: 15,
                    }}
                />
                <Text category="h6">
                    {user.first_name} {user.last_name}
                </Text>
            </Layout>
            <Layout>
                <List
                    data={[
                        {name: t('Email'), value: user.email},
                        {name: t('Birthday'), value: user.profile.birthdate},
                        {name: t('Country'), value: user.profile.country.name},
                        {name: t('City'), value: user.profile.city.name},
                        {name: t('Phone'), value: user.profile.phone_number},
                        {name: t('Personal Id'), value: user.profile.personal_id},
                        {name: t('Position'), value: user.profile.position.name},
                        {name: t('Department'), value: user.profile.department.name},
                    ]}
                    renderItem={(info) => (
                        <Layout style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 15,
                            borderBottomColor: theme['border-basic-color-2'],
                            borderBottomWidth: 1,
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>{info.item.name}</Text>
                            <Text>{info.item.value}</Text>
                        </Layout>
                    )}
                />
            </Layout>
        </SafeAreaLayout>
    )
}