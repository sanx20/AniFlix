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
    headerContainer: {
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    headerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#BB86FC',
        textAlign: 'center',
        marginTop: 4,
    },
    infoContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
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
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 16,
        color: '#E0E0E0',
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 16,
        color: '#E0E0E0',
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
    roleStyle: {
        fontSize: 10,
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
});
