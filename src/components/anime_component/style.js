import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#1F1F1F',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E5E5E5',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#BBBBBB',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#BBBBBB',
        marginBottom: 5,
    },
});
