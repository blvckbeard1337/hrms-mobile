import {Card, Icon, Layout, ProgressBar, Text} from "@ui-kitten/components";
import React from "react";
import {NavigationMenu} from "../components/NavigationMenu";
import {SafeAreaLayout} from "../components/SafeAreaLayout";

export const DashboardScreen = ({navigation}) => {
    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation}/>
            <Layout style={{padding: 15, alignItems: 'center'}}>
                <Card style={{
                    paddingBottom: 15,
                }}
                      header={(
                          <Layout>
                              <Text category="h5">Available Days</Text>
                              <Text category="p1">{`${new Date().toLocaleDateString('en-EN', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                              })}`}</Text>
                          </Layout>
                      )}
                      status="danger"
                >

                    <Layout style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 5,
                        marginTop: 15,
                    }}>
                        <Text category="p1">Paid Vacation</Text>
                        <Text category="p1">6 of 20 days</Text>
                    </Layout>
                    <ProgressBar status="primary" progress={6 / 20} size="giant"/>
                    <Layout style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 15,
                        marginBottom: 5,
                        width: "100%",
                    }}>
                        <Text category="p1">Sick Leave</Text>
                        <Text category="p1">3 of 20 days</Text>
                    </Layout>
                    <ProgressBar status="danger" progress={3 / 20} size="giant"/>

                </Card>
                <Card style={{
                    paddingBottom: 15,
                    marginTop: 20,
                }}
                      status="warning"
                      header={(
                          <Text category="h5">Current Month Birthdays</Text>
                      )}
                >

                    <Layout style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 5,
                        marginTop: 15,
                    }}>
                        <Layout style={{
                            flexDirection: "row"
                        }}>
                            <Icon
                                name="gift-outline"
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text category="p1">Artan Ibrahimi</Text>
                        </Layout>
                        <Text category="p1">07 June</Text>
                    </Layout>

                </Card>
            </Layout>
        </SafeAreaLayout>
    )
}