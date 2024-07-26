import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {Toggle} from "@ui-kitten/components";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

export const SettingsTheme = ({navigation}) => {
    const {theme, toggleTheme} = useContext(ThemeContext)

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Theme"/>
            <Toggle
                style={{
                    padding: 15,
                }}
                checked={theme === 'dark'} onChange={toggleTheme}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Toggle>
        </SafeAreaLayout>
    )
}