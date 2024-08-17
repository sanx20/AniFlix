import React from 'react';
import { View, Text, Button, } from 'react-native';
import styles from './style';

export default CustomHeader = ({ title, onSignOut }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Button onPress={onSignOut} title="Sign out" color="#BB86FC" />
        </View>
    );
};

