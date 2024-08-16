import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import {
    fetchAiringManga,
    fetchUpcomingManga,
    fetchByPopularityManga,
    fetchFavoriteManga,
} from '../../redux/slices/mangaSlice';

export const MangaListScreen = () => {
    const dispatch = useDispatch();
    const airingManga = useSelector((state) => state.manga.airingManga);
    const upcomingManga = useSelector((state) => state.manga.upcomingManga);
    const byPopularityManga = useSelector((state) => state.manga.byPopularityManga);
    const favoriteManga = useSelector((state) => state.manga.favoriteManga);

    const loadingStatus = useSelector((state) => state.manga.status);
    const errorStatus = useSelector((state) => state.manga.error);

    const handleLogout = () => {
        FIREBASE_AUTH.signOut();
    };

    useEffect(() => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const fetchData = async () => {
            await dispatch(fetchAiringManga());
            await delay(500); // 0.5 second delay
            await dispatch(fetchUpcomingManga());
            await delay(500); // 0.5 second delay
            await dispatch(fetchByPopularityManga());
            await delay(500); // 0.5 second delay
            await dispatch(fetchFavoriteManga());
        };

        fetchData();
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <View style={styles.gridItem}>
            <Image source={{ uri: item.images.jpg.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    const renderFlatList = (data, loading, error) => {
        if (loading) {
            return <ActivityIndicator size="large" color="#000" />;
        }

        if (error) {
            return <Text style={styles.errorText}>Error fetching data: {error}</Text>;
        }

        return (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer} // Optional: Add styles for spacing
            />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Button title="Logout" onPress={handleLogout} />

            <View style={styles.sectionContainer}>
                <Text style={styles.header}>Airing Manga</Text>
                {renderFlatList(airingManga, loadingStatus.airing === 'loading', errorStatus.airing)}
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.header}>Upcoming Manga</Text>
                {renderFlatList(upcomingManga, loadingStatus.upcoming === 'loading', errorStatus.upcoming)}
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.header}>Popular Manga</Text>
                {renderFlatList(byPopularityManga, loadingStatus.byPopularity === 'loading', errorStatus.byPopularity)}
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.header}>Favorite Manga</Text>
                {renderFlatList(favoriteManga, loadingStatus.favorite === 'loading', errorStatus.favorite)}
            </View>
        </ScrollView>
    );
};
