import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    gridItem: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 150,
    },
    title: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
