import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#1F1F1F', // Dark background color
        borderRadius: 8,
        elevation: 5, // Adds more shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 4 }, // Increased shadow offset for depth effect
        shadowOpacity: 0.4, // Increased shadow opacity for stronger effect
        shadowRadius: 6, // Increased shadow radius for softer shadow edges
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginRight: 15, // More space between image and text
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E5E5E5', // Light color for text
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#BBBBBB', // Subtle grey color for subtitle
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#BBBBBB', // Subtle grey color for detail text
        marginBottom: 5,
    },
});
