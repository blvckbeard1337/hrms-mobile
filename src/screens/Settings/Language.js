import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {useState} from "react";
import {IndexPath, Layout, Select, SelectItem, Text} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";

export const SettingsLanguage = ({navigation}) => {
    const {i18n, t} = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(
        i18n.language !== 'en' ? 1 : 0
    ));
    const languages = ['English', 'Shqip'];
    const lang_slug = ['en', 'sq']

    async function toggleLanguage(index) {
        if (lang_slug[index] !== i18n.language)
            await i18n.changeLanguage(lang_slug[index])
    }

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t('Language')}/>
            <Layout style={styles.layout}>
                <Select
                    label={t('Select Language')}
                    selectedIndex={selectedIndex}
                    onSelect={index => {
                        setSelectedIndex(index)
                        toggleLanguage(index.row)
                    }}
                    value={languages[selectedIndex.row]}
                >
                    {languages.map((language, index) => (
                        <SelectItem key={index} title={language}/>
                    ))}
                </Select>
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
