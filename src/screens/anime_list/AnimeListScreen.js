import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnime } from '../../redux/slices/AnimeSlice';
import styles from './style';
import AnimeComponent from '../../components/anime_component/index';

export default function AnimeListScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAnime(1));
    }, [dispatch]);

    const animeList = useSelector((state) => state.anime.animeList);
    const status = useSelector((state) => state.anime.status);
    const isFetchingMore = useSelector((state) => state.anime.isFetchingMore);
    const hasNextPage = useSelector((state) => state.anime.hasNextPage);
    const error = useSelector((state) => state.anime.error);
    const currentPage = useSelector((state) => state.anime.currentPage);

    const renderItem = ({ item }) => <AnimeComponent item={item} />;

    const loadMoreAnime = () => {
        if (hasNextPage && !isFetchingMore) {
            dispatch(fetchAnime(currentPage + 1));
        }
    };

    return (
        <View style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#BB86FC" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            <FlatList
                data={animeList}
                renderItem={renderItem}
                keyExtractor={(item) => item.mal_id.toString() + item.title + Date.now().toString()}
                onEndReached={loadMoreAnime}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#BB86FC" /> : null}
            />
        </View>
    );
};
