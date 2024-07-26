import {Button, Card, Icon, Layout, Text, useTheme} from "@ui-kitten/components";
import React, {useContext, useEffect, useState} from "react";
import {Calendar} from 'react-native-big-calendar'
import {Pressable} from "react-native";
import {NavigationMenu} from "../components/NavigationMenu";
import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {AttendanceContext} from "../context/AttendanceContext";
import {useAuth} from "../context/AuthContext";

export const WorkScheduleScreen = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const theme = useTheme()
    const {user} = useAuth();
    const {fetchSchedule, schedule} = useContext(AttendanceContext)

    useEffect(() => {
        fetchSchedule(user.id, new Date())
    }, []);

    const controlsDate = async (objective = null) => {
        let new_date = objective === null ? new Date() : new Date(date);

        if (objective !== null) {
            if (objective) {
                new_date.setDate(new_date.getDate() + 7);
            }

            if (!objective) {
                new_date.setDate(new_date.getDate() - 7);
            }
        }

        await fetchSchedule(user.id, new Date(new_date))

        setDate(new_date)
    }

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Weekly Schedules"/>
            <Layout style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                backgroundColor: theme['background-basic-color-2'],
            }}>
                <Text category="p1">
                    {date.toLocaleString('default', {month: 'long'})}
                </Text>
            </Layout>
            <Layout style={{paddingHorizontal: 15, paddingTop: 15, alignItems: 'center'}}>
                <Layout style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 25,
                    width: '100%'
                }}>
                    <Button
                        onPress={() => controlsDate(false)}
                        size="small"
                        status="basic"
                        accessoryLeft={
                            <Icon
                                name="arrow-back-outline"
                            />
                        }
                    >
                        Prev
                    </Button>
                    <Button
                        onPress={() => controlsDate()}
                        size="small"
                        status="basic"
                        accessoryLeft={<Icon
                            name="calendar-outline"
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />}
                    >
                    </Button>

                    <Button
                        onPress={() => controlsDate(true)}
                        size="small"
                        status="basic"
                        accessoryRight={
                            <Icon
                                name="arrow-forward-outline"
                            />
                        }
                    >
                        Next
                    </Button>
                </Layout>
            </Layout>
            <Calendar events={schedule} height={600} date={date}/>
        </SafeAreaLayout>
    )
}