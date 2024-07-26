import {Icon, Layout, TopNavigation, TopNavigationAction, useTheme} from "@ui-kitten/components";
import React from "react";

export const NavigationMenu = ({title, navigation}) => {
    let icon = !title ? 'menu' : 'arrow-back-outline';
    title = !title ? "HR NEXUS" : title;
    const theme = useTheme();

    return (
        <Layout
            level="1"
        >
            <TopNavigation
                appearance="default"
                title="HR NEXUS"
                alignment="center"
                style={{
                    borderBottomColor: theme['border-basic-color-2'],
                    borderBottomWidth: 1.5,
                }}
                subtitle={title !== 'HR NEXUS' ? title : ''}
                accessoryLeft={() => (
                    <TopNavigationAction
                        icon={<Icon name={icon}/>}
                        onPress={icon !== 'menu' ? navigation.goBack : navigation.toggleDrawer}
                    />
                )}

                accessoryRight={() => title === 'HR NEXUS' ? (
                    <TopNavigationAction
                        icon={<Icon name="bell-outline"/>}
                    />
                ) : null}
            />
        </Layout>
    )
}