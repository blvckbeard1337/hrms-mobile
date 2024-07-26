import {createContext, useEffect, useState} from "react";
import * as Location from "expo-location";
import {Alert} from "react-native";

export const GeoContext = createContext({});
export const GeoProvider = ({children}) => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)

    useEffect(() => {
        checkIfLocationEnabled()
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert('Location not enabled', 'Please enable your Location', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        } else {
            setLocationServicesEnabled(enabled)
        }
    }

    const getCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Allow the app to use the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }

        const {coords} = await Location.getCurrentPositionAsync();

        if (!coords) {
            return {
                latlng: null
            }
        }

        return {
            latlng: coords.latitude + ', ' + coords.longitude
        };
    }

    return <GeoContext.Provider value={{
        getCurrentLocation
    }}>{children}</GeoContext.Provider>
}