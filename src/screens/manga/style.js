import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
        padding: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    infoContainer: {
        paddingHorizontal: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
    },
    heartIcon: {
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#BB86FC',
        textAlign: 'center',
        marginBottom: 16,
    },
    synopsis: {
        fontSize: 16,
        color: '#E0E0E0',
        marginBottom: 16,
        lineHeight: 22,
        textAlign: 'justify',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#BB86FC',
        marginBottom: 8,
        marginTop: 16,
    },
    detailText: {
        fontSize: 16,
        color: '#E0E0E0',
        marginBottom: 8,
    },
    characterList: {
        paddingVertical: 8,
    },
    characterContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    characterImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    characterName: {
        fontSize: 14,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 4,
    },
    noDataText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 16,
    },
    roleStyle: {
        fontSize: 10,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 4,
    },
});
