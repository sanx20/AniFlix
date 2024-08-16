import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    },
    gridItem: {
        flex: 1,
        margin: 8,
        borderRadius: 10,
        backgroundColor: '#1c1c1e',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    score: {
        fontSize: 12,
        color: '#d4af37',
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
