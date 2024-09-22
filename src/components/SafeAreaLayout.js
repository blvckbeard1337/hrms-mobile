import React from "react"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {Layout, Spinner, useTheme} from "@ui-kitten/components"
import {useSpinner} from "../context/LoaderContext";
import {ActivityIndicator, Modal, View, StyleSheet, Text} from "react-native";

export const SafeAreaLayout = ({insets, ...props}) => {
    insets = 'top'
    const theme = useTheme()
    const insetsConfig = useSafeAreaInsets()
    const {loading} = useSpinner()

    const backgroundColor = theme[`background-basic-color-${props.level}`]

    return (
        <>
            <Layout
                {...props}
                style={[
                    props.style,
                    backgroundColor && {backgroundColor},
                    {
                        paddingTop: insets === "top" ? insetsConfig.top : 0,
                        paddingBottom: insets === "bottom" ? insetsConfig.bottom : 0,
                        flex: 1,
                    }
                ]}
            />
            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={styles.overlay}>
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    </View>
                </Modal>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    loaderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
});