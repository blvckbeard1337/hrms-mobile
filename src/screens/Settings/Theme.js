import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {Toggle} from "@ui-kitten/components";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";

export const SettingsTheme = ({navigation}) => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const {t} = useTranslation()

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t("Theme")}/>
            <Toggle
                style={{
                    padding: 15,
                }}
                checked={theme === 'dark'} onChange={toggleTheme}>
                {theme === 'dark' ? t('Dark Mode') : t('Light Mode')}
            </Toggle>
        </SafeAreaLayout>
    )
}