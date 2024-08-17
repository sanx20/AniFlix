import React, { useEffect, useRef } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnime } from '../../redux/slices/AnimeSlice';
import styles from './style';
import AnimeComponent from '../../components/anime_component/index';

export default function AnimeListScreen() {
    const dispatch = useDispatch();
    const uniqueKeys = useRef(new Set());

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

    const getKey = (item, index) => {
        const key = `${item.mal_id}-${index}`;
        uniqueKeys.current.add(key);
        return key;
    };

    return (
        <View style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#BB86FC" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            <FlatList
                data={animeList}
                renderItem={renderItem}
                keyExtractor={(item, index) => getKey(item, index)}
                onEndReached={loadMoreAnime}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#BB86FC" /> : null}
            />
        </View>
    );
};
