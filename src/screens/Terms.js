import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {NavigationMenu} from "../components/NavigationMenu";
import {Card, Layout, Text} from "@ui-kitten/components";

export const Terms = ({navigation}) => {
    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title="Terms and conditions"/>
            <Layout
                style={{
                    padding: 15,
                }}
            >
                <Card
                    header={(<Text category="h5">Terms of service</Text>)}>
                    <Text category="p1">
                        Terms of service are the legal agreements between a service provider and a person who wants to
                        use that service. The person must agree to abide by the terms of service in order to use the
                        offered service. Terms of service can also be merely a disclaimer, especially regarding the use
                        of websites.
                    </Text>
                </Card>
            </Layout>
        </SafeAreaLayout>
    )
}