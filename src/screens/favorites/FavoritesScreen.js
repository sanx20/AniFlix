import { Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style';
import MangaComponent from '../../components/manga_component/index';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export default function FavouriteScreen() {
    const favorites = useSelector((state) => state.favorites.favorites);
    const status = useSelector((state) => state.favorites.status);
    const error = useSelector((state) => state.favorites.error);
    const signOut = () => {
        FIREBASE_AUTH.signOut();
    }

    const renderItem = ({ item }) => (
        <View style={styles.gridItem}>
            <MangaComponent item={item} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Button onPress={signOut} title="Sign out" />

            {status === 'loading' && <ActivityIndicator size="large" color="#000" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.mal_id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};