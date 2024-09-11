import React from "react"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {Layout, Spinner, useTheme} from "@ui-kitten/components"
import {useSpinner} from "../context/LoaderContext";

export const SafeAreaLayout = ({insets, ...props}) => {
    insets = 'top'
    const theme = useTheme()
    const insetsConfig = useSafeAreaInsets()
    const {loading, setLoading} = useSpinner()

    const backgroundColor = theme[`background-basic-color-${props.level}`]

    return loading ? (
        <Layout style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Spinner size='giant'/>
        </Layout>
    ) : (
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
    )
}
