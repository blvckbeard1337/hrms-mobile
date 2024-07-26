import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {NavigationMenu} from "../components/NavigationMenu";
import {Avatar, Layout, useTheme, Text, List, ListItem, Icon} from "@ui-kitten/components";
import {useAuth} from "../context/AuthContext";
import React from "react";
import {ImageBackground} from "react-native";

export const Profile = ({navigation}) => {
    const {user} = useAuth();
    const theme = useTheme();

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Profile"/>
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
                        {name: 'Email', value: user.email},
                        {name: 'Birthday', value: user.profile.birthdate},
                        {name: 'Country', value: user.profile.country.name},
                        {name: 'City', value: user.profile.city.name},
                        {name: 'Phone', value: user.profile.phone_number},
                        {name: 'Personal Id', value: user.profile.personal_id},
                        {name: 'Position', value: user.profile.position.name},
                        {name: 'Department', value: user.profile.department.name},
                    ]}
                    renderItem={(info) => (
                        <Layout style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 15,
                            borderBottomColor: theme['color-basic-200'],
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