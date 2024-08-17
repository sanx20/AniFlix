import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    reviewCard: {
        flexDirection: 'row',
        backgroundColor: '#121212',
        borderRadius: 10,
        marginVertical: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    animeImageContainer: {
        marginRight: 16,
    },
    animeImage: {
        width: 80,
        height: 110,
        borderRadius: 10,
    },
    reviewInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    animeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    reviewUsername: {
        fontSize: 14,
        color: '#BBBBBB',
        marginBottom: 6,
    },
    reviewScore: {
        fontSize: 14,
        color: '#BB86FC',
        marginBottom: 6,
    },
    reviewSnippet: {
        fontSize: 14,
        color: '#DDDDDD',
        lineHeight: 22,
    },
});
