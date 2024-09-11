import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {NavigationMenu} from "../components/NavigationMenu";
import {Icon, List, ListItem, useTheme, Text, Card, Layout} from "@ui-kitten/components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SettingsPassword} from "./Settings/Password";
import {SettingsTheme} from "./Settings/Theme";
import {SettingsLanguage} from "./Settings/Language";
import {useTranslation} from "react-i18next";

const SettingsStack = createNativeStackNavigator();

export const Settings = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen options={{headerShown: false}} name="Home" component={Home}/>
            <SettingsStack.Screen options={{headerShown: false}} name="Password" component={SettingsPassword}/>
            <SettingsStack.Screen options={{headerShown: false}} name="Theme" component={SettingsTheme}/>
            <SettingsStack.Screen options={{headerShown: false}} name="Language" component={SettingsLanguage}/>
        </SettingsStack.Navigator>
    )
}

const Home = ({navigation}) => {
    const theme = useTheme()
    const {t} = useTranslation()

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t('Settings')}/>

            <Layout
                style={{
                    padding: 15,
                }}>
                <Layout style={{
                    borderColor: theme['border-basic-color-2'],
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 15,
                }}>
                    <List
                        data={[
                            {
                                title: t('Theme'),
                                description: t('Update color scheme of app.'),
                                route: 'Theme'
                            },
                            {
                                title: t('Password'),
                                description: t('Update account password.'),
                                route: 'Password'
                            },
                            {
                                title: t('Language'),
                                description: t('Change application language.'),
                                route: 'Language'
                            }
                        ]}
                        renderItem={(info) => (
                            <ListItem
                                title={info.item.title}
                                style={{
                                    borderBottomColor: theme['border-basic-color-2'],
                                    borderBottomWidth: 1,
                                }}
                                description={info.item.description}
                                onPress={() => navigation.navigate(info.item.route)}
                                accessoryRight={() => (
                                    <Icon
                                        name="arrow-forward-outline"
                                        fill={theme['text-hint-color']}
                                        style={{
                                            width: 24,
                                            height: 24,
                                        }}
                                    />
                                )}

                            />
                        )}
                    />
                </Layout>
            </Layout>
        </SafeAreaLayout>
    )
}