import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { fetchManga } from '../../redux/slices/mangaSlice';

export const MangaListScreen = () => {
    const dispatch = useDispatch();
    const mangaList = useSelector((state) => state.manga.mangaList);
    const status = useSelector((state) => state.manga.status);
    const isFetchingMore = useSelector((state) => state.manga.isFetchingMore);
    const hasNextPage = useSelector((state) => state.manga.hasNextPage);
    const error = useSelector((state) => state.manga.error);
    const currentPage = useSelector((state) => state.manga.currentPage);

    const handleLogout = () => {
        FIREBASE_AUTH.signOut();
    };

    useEffect(() => {
        dispatch(fetchManga(1));
    }, [dispatch]);

    const loadMoreManga = () => {
        if (hasNextPage && !isFetchingMore) {
            dispatch(fetchManga(currentPage + 1));
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.gridItem}>
            <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={handleLogout} />
            {status === 'loading' && <ActivityIndicator size="large" color="#000" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            <FlatList
                data={mangaList}
                renderItem={renderItem}
                numColumns={4}
                columnWrapperStyle={styles.columnWrapper}
                onEndReached={loadMoreManga}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#000" /> : null}
            />
        </View>
    );
};
