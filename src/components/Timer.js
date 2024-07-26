import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const CountdownTimer = ({ initialSeconds }) => {
    const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isRunning && secondsRemaining > 0) {
            const interval = BackgroundTimer.setInterval(() => {
                setSecondsRemaining(prev => prev - 1);
            }, 1000);

            setIntervalId(interval);

            return () => {
                BackgroundTimer.clearInterval(interval);
            };
        } else if (secondsRemaining <= 0) {
            BackgroundTimer.clearInterval(intervalId);
            setIsRunning(false);
        }
    }, [isRunning, secondsRemaining]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const stopTimer = () => {
        if (isRunning) {
            BackgroundTimer.clearInterval(intervalId);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        stopTimer();
        setSecondsRemaining(initialSeconds);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(secondsRemaining)}</Text>
            <Button title={isRunning ? "Pause" : "Start"} onPress={isRunning ? stopTimer : startTimer} />
            <Button title="Reset" onPress={resetTimer} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 48,
        marginBottom: 20,
    },
});

export default CountdownTimer;