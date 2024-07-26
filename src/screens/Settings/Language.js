import {NavigationMenu} from "../../components/NavigationMenu";
import {SafeAreaLayout} from "../../components/SafeAreaLayout";
import {useState} from "react";
import {IndexPath, Layout, Select, SelectItem, Text} from "@ui-kitten/components";
import {StyleSheet} from "react-native";

export const SettingsLanguage = ({navigation}) => {
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const languages = ['English', 'Shqip'];

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Langauge"/>
            <Layout style={styles.layout}>
                <Select
                    label='Select Language'
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    value={languages[selectedIndex.row]}
                >
                    {languages.map((language, index) => (
                        <SelectItem key={index} title={language} />
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
