import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {Button, Input, Layout, Text} from "@ui-kitten/components";
import {useState} from "react";
import {StyleSheet} from "react-native";
import Toast from "react-native-toast-message";

export const SettingsPassword = ({navigation}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: 'All fields are required.'
            })
        }

        if (newPassword === confirmPassword) {
            console.log('Password changed successfully');
            // Perform the password change action (e.g., API call)
        } else {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: 'Confirm password doesn\'t match!'
            })
        }
    };

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Password"/>
            <Layout style={styles.layout}>

                <Input
                    label='Current Password'
                    placeholder='Enter your current password'
                    value={currentPassword}
                    secureTextEntry={true}
                    onChangeText={setCurrentPassword}
                    style={styles.input}
                />
                <Input
                    label='New Password'
                    placeholder='Enter your new password'
                    value={newPassword}
                    secureTextEntry={true}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />
                <Input
                    label='Confirm Password'
                    placeholder='Confirm your new password'
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