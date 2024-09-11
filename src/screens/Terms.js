import {SafeAreaLayout} from "../components/SafeAreaLayout";
import {NavigationMenu} from "../components/NavigationMenu";
import {Card, Layout, Text} from "@ui-kitten/components";
import {ScrollView} from "react-native";
import {useTranslation} from "react-i18next";

export const Terms = ({navigation}) => {
    const {t} = useTranslation();

    return (
        <SafeAreaLayout>
            <NavigationMenu navigation={navigation} title={t("Privacy and Policy")}/>
            <ScrollView
                style={{
                    padding: 15,
                }}
            >
                <Card
                    style={{
                        paddingBottom: 15,
                    }}
                    header={(<Text category="h5">{t('Information')}</Text>)}>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Privacy Policy for HR-Nexus App')}</Text>
                    <Text category="p1">
                        {t('This Privacy Policy governs the manner in which the HR-Nexus mobile application ("App") collects, uses, maintains, and discloses information collected from users (each, a "User") of the App.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Information Collection and Use')}</Text>
                    <Text category="p1">
                        {t('The HR-Nexus mobile app serves as a platform for users to manage their HR-related tasks, including login, password changes, profile management, vacation requests, and work check-ins and check-outs. The app collects personal identification information from Users during the registration and login process, which may include name, email address, and other relevant details required for authentication.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Access to Device Location')}</Text>
                    <Text category="p1">
                        {t('The HR-Nexus mobile app requires access to the mobile device’s location services. This access is used solely for the purpose of tracking the location of Users when they check in and check out for work. This functionality ensures accurate record-keeping of work hours. The app does not store or share location data beyond the purposes outlined.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Usage of Collected Information')}</Text>
                    <Text category="p1">
                        {t('The information collected by the HR-Nexus mobile app is used for the following purposes: Authentication and Authorization: To enable secure login and manage user access. Profile Management: To allow Users to view and update their personal profile information.Vacation Management: To enable Users to view their vacation balance and apply for vacation time. Work Check-in/Check-out: To track Users work hours by recording their check-in and check-out times along with location data.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Data Security')}</Text>
                    <Text category="p1">
                        {t('HR-Nexus mobile app adopts industry-standard data collection, storage, and processing practices to ensure the security and confidentiality of user information. We implement appropriate security measures to prevent unauthorized access, disclosure, alteration, or destruction of personal information stored on our servers.')}
                    </Text>

                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Sharing of Information')}</Text>
                    <Text category="p1">
                        {t('The HR-Nexus mobile app does not sell, trade, or rent Users\' personal identification information to third parties. User data collected by the app is used solely for the purpose of HR management and operational functionality. However, aggregated and anonymized data may be shared with trusted partners for analytical or research purposes.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Changes to this Privacy Policy')}</Text>
                    <Text category="p1">
                        {t('HR-Nexus mobile app reserves the right to update or modify this Privacy Policy at any time. Users will be notified of any changes by updating the "Last Updated" date at the bottom of this page. Users are encouraged to review this Privacy Policy periodically for any updates or amendments.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Acceptance of Terms')}</Text>
                    <Text category="p1">
                        {t('By using the HR-Nexus mobile app, Users signify their acceptance of this Privacy Policy. If Users do not agree with this policy, they should refrain from using the app. Continued use of the app following the posting of changes to this policy will be deemed as acceptance of those changes.')}
                    </Text>
                    <Text category="h5" style={{
                        marginVertical: 15,
                    }}>{t('Contact Information')}</Text>
                    <Text category="p1" style={{marginBottom: 15,}}>
                        {t('If you have any questions or concerns about this Privacy Policy or the practices of the HR-Nexus app, please contact us at:')}
                    </Text>
                    <Text category="p1">
                        {t('HR Nexus Ltd.')}
                    </Text>
                    <Text category="p1">
                        {t('Tirane Pn.')}
                    </Text>
                    <Text category="p1">
                        {t('1001 Tirane, Albania')}
                    </Text>
                    <Text category="p1">
                        {t('info@hr-nexus.net')}
                    </Text>
                    <Text category="p1">
                        {t('+38349555997')}
                    </Text>
                    <Text category="p1">
                        {t('www.hr-nexus.net')}
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaLayout>
    )
}