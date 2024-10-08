import {useState} from "react"
import {View, TouchableWithoutFeedback, Image, ImageBackground} from "react-native"
import {
    Button,
    Input,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
    Icon
} from "@ui-kitten/components"
import {KeyboardAvoidingView} from "./extra/3rd-party"
import {useAuth} from "../context/AuthContext";
import Toast from "react-native-toast-message";
import {useTranslation} from "react-i18next";

export const LoginScreen = ({navigation}) => {
    const {onLogin, resetPassword} = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [forgetPassword, setForgetPassword] = useState(false);
    const {t} = useTranslation();

    const styles = useStyleSheet(themedStyles)

    const login = () => {
        if (forgetPassword) {
            resetPassword(email)
            setForgetPassword(false);
        } else {
            onLogin(email, password)
        }
    }

    const onPasswordIconPress = () => {
        setPasswordVisible(!passwordVisible)
    }

    const renderPasswordIcon = props => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...props} name={passwordVisible ? "eye-off" : "eye"}/>
        </TouchableWithoutFeedback>
    )

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground
                src={'https://fastly.picsum.photos/id/1043/800/600.jpg?hmac=G1C8P2iHYm53h1YzfFJAsXoIttA9VPHpMrjXASEiH_Y'}>
                <View style={styles.headerContainer}>
                    <Image src={'https://hr-nexus.net/media/logos/HR-nexus.png'} style={{
                        width: 250,
                        height: 100,
                        resizeMode: 'contain',
                        scale: .5,
                    }}/>
                </View>
            </ImageBackground>
            {!forgetPassword ? (
                <Layout style={styles.formContainer} level="1">
                    <Text style={styles.signInLabel} category="h5">
                        {t("Sign in")}
                    </Text>
                    <Input
                        label={() => <Text style={{marginBottom: 5, fontWeight: "bold"}}>{t("Email")}</Text>}
                        value={email}
                        size="large"
                        style={{
                            borderColor: 'transparent'
                        }}
                        onChangeText={setEmail}
                    />
                    <Input
                        style={styles.passwordInput}
                        textStyle={{color: "#000"}}
                        label={() => <Text style={{marginBottom: 5, fontWeight: 800}}>{t("Password")}</Text>}
                        value={password}
                        size="large"
                        secureTextEntry={!passwordVisible}
                        onChangeText={setPassword}
                    />
                    <View style={styles.forgotPasswordContainer}>
                        <Button
                            style={styles.forgotPasswordButton}
                            appearance="ghost"
                            status="primary"
                            onPress={() => setForgetPassword(true)}
                        >
                            {t("Forgot your password?")}
                        </Button>
                    </View>
                </Layout>

            ) : (
                <Layout style={styles.formContainer} level="1">
                    <Text style={styles.signInLabel} category="h5">
                        {t("Forget password")}
                    </Text>
                    <Input
                        label={() => <Text style={{marginBottom: 5, fontWeight: "bold"}}>{t("Email")}</Text>}
                        value={email}
                        size="large"
                        style={{
                            borderColor: 'transparent'
                        }}
                        onChangeText={setEmail}
                    />
                </Layout>
            )}
            <Button onPress={() => login()} style={styles.signUpButton} size="medium">
                {t("Continue")}
            </Button>
        </KeyboardAvoidingView>
    )
}

const themedStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-1"
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 216,
        backgroundColor: 'rgba(255,255,255,.75)'
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16
    },
    signInLabel: {
        textAlign: "center",
        marginBottom: 32,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    passwordInput: {
        marginTop: 16,
        borderColor: 'transparent'
    },
    forgotPasswordButton: {
        paddingHorizontal: 0
    }
})
