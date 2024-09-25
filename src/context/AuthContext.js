import {createContext, useContext, useEffect, useState} from "react"
import * as SecureStore from "expo-secure-store"
import axios from "axios"
import Toast from 'react-native-toast-message';
import {Alert} from "react-native";
import * as Location from 'expo-location'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";
import {registerBackgroundTimer, unregisterBackgroundTimer} from "../components/BackgroundNotifications";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = "jwt"
const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const {t} = useTranslation()
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null
    })

    const [user, setUser] = useState({})

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)

            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                axios.defaults.headers.common["Accept"] = `application/json`

                setAuthState({
                    token: token,
                    authenticated: true
                })

                await fetchUser()
                await attendanceSettings()
            }
        }

        loadToken()
    }, [])


    const attendanceSettings = async () => {
        await axios.get(`${API_URL}/attendance-settings`)
            .then(({data}) => {
                AsyncStorage.setItem('attendance', JSON.stringify(data.data))
            })
    }

    const login = async (email, password) => {
        try {
            const result = await axios.post(`${API_URL}/auth/login`, {email, password})

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.accessToken}`

            setAuthState({
                token: result.data.accessToken,
                authenticated: true
            })

            Toast.show({
                'type': 'success',
                'text1': t('Congrats'),
                'text2': t('You have successfully logged in'),
            })

            await registerBackgroundTimer()

            await fetchUser()

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken)

        } catch (e) {
            Toast.show({
                'type': 'error',
                'text1': t('Error'),
                'text2': t('Invalid credentials!'),
            })
        }
    }

    const resetPassword = async (email) => {
        await axios.post(`${API_URL}/auth/forgot`, {
            email: email
        })
            .then(res => Toast.show({
                "type": "success",
                "text1": t("Forget password"),
                "text2": t("Email sent successfully!"),
            }))
            .catch(e => Toast.show({
                'type': 'error',
                'text1': t('Error'),
                'text2': t('Email is invalid!'),
            }));
    }
    const changePassword = async (old_pw, pw, pw_confirmation) => {
        await axios.put(`${API_URL}/auth/password`, {
            old_password: old_pw,
            password: pw,
            password_confirmation: pw_confirmation
        })
            .then(res => Toast.show({
                "type": "success",
                "text1": t("Congrats"),
                "text2": t("Password successfully changed!"),
            }))
            .catch(e => Toast.show({
                'type': 'error',
                'text1': t('Error'),
                'text2': t('Something went wrong!'),
            }));
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)

        await unregisterBackgroundTimer()

        axios.defaults.headers.common["Authorization"] = ""

        setAuthState({
            token: null,
            authenticated: false
        })

        setUser({})
    }

    const fetchUser = async () => {
        if (Object.keys(user).length > 0) return

        return await axios
            .get(`${API_URL}/auth/user`)
            .then(res => {
                setUser(res.data.data)
            })
            .catch(e => {
                Toast.show({
                    type: 'error',
                    text1: e.message,
                });
            })
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState,
        user,
        resetPassword,
        changePassword
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
