import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeReviews } from '../../redux/slices/reviewSlice';
import styles from './style';

export default function ReviewListScreen({ navigation }) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviewsData);
    const hasNextPage = useSelector((state) => state.reviews.hasNextPage);
    const loading = useSelector((state) => state.reviews.loading);
    const currentPage = useSelector((state) => state.reviews.currentPage);

    useEffect(() => {
        dispatch(fetchAnimeReviews({ page: 1 }));
    }, [dispatch]);

    const loadMoreReviews = () => {
        if (hasNextPage && !loading) {
            dispatch(fetchAnimeReviews({ page: currentPage + 1 }));
        }
    };

    const renderReview = ({ item, index }) => (
        <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => navigation.navigate('ReviewDetail', { review: item })}
        >
            <View style={styles.animeImageContainer}>
                <Image source={{ uri: item.entry.images.jpg.image_url }} style={styles.animeImage} />
            </View>
            <View style={styles.reviewInfo}>
                <Text style={styles.animeTitle}>{item.entry.title}</Text>
                <Text style={styles.reviewUsername}>by {item.user.username}</Text>
                <Text style={styles.reviewScore}>Score: {item.score}</Text>
                <Text numberOfLines={3} style={styles.reviewSnippet}>{item.review}</Text>
            </View>
        </TouchableOpacity>
    );

    const keyExtractor = (item, index) => `${item.entry.mal_id}-${index}`;

    return (
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
            <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={keyExtractor}
                onEndReached={loadMoreReviews}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && <ActivityIndicator size="large" color="#BB86FC" />}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
