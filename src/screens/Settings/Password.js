import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {Button, Input, Layout, Text} from "@ui-kitten/components";
import {useState} from "react";
import {StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext";

export const SettingsPassword = ({navigation}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {t} = useTranslation()
    const {changePassword} = useAuth()

    const handleChangePassword = async () => {
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            Toast.show({
                type: "error",
                text1: t('Error'),
                text2: t('All fields are required.')
            })
        }

        if (newPassword === confirmPassword) {
            await changePassword(currentPassword, newPassword, confirmPassword)
        } else {
            Toast.show({
                type: "error",
                text1: t('Error'),
                text2: t('Confirm password doesn\'t match!')
            })
        }
    };

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t("Password")}/>
            <Layout style={styles.layout}>

                <Input
                    label={t('Current Password')}
                    placeholder={t('Enter your current password')}
                    value={currentPassword}
                    secureTextEntry={true}
                    onChangeText={setCurrentPassword}
                    style={styles.input}
                />
                <Input
                    label={t('New Password')}
                    placeholder={t('Enter your new password')}
                    value={newPassword}
                    secureTextEntry={true}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />
                <Input
                    label={t('Confirm Password')}
                    placeholder={t('Confirm your new password')}
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />
                <Button onPress={handleChangePassword} style={styles.button}>
                    Change Password
                </Button>
            </Layout>
        </SafeAreaLayout>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 15,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});