import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import { fetchManga } from '../../redux/slices/mangaSlice';
import MangaComponent from '../../components/manga_component/index';

export default function MangaListScreen() {
    const dispatch = useDispatch();
    const mangaList = useSelector((state) => state.manga.mangaList);
    const status = useSelector((state) => state.manga.status);
    const isFetchingMore = useSelector((state) => state.manga.isFetchingMore);
    const hasNextPage = useSelector((state) => state.manga.hasNextPage);
    const error = useSelector((state) => state.manga.error);
    const currentPage = useSelector((state) => state.manga.currentPage);

    useEffect(() => {
        dispatch(fetchManga(1));
    }, [dispatch]);

    const loadMoreManga = () => {
        if (hasNextPage && !isFetchingMore) {
            dispatch(fetchManga(currentPage + 1));
        }
    };

    const renderItem = ({ item }) => <MangaComponent item={item} />;


    return (
        <View style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#BB86FC" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            <FlatList
                data={mangaList}
                renderItem={renderItem}
                keyExtractor={(item) => item.mal_id.toString() + item.title + Date.now().toString()} numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                onEndReached={loadMoreManga}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#BB86FC" /> : null}
            />
        </View>
    );
};
