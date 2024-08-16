import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeCharacters } from '../../redux/slices/AnimeCharacterSlice';
import styles from './style';

export default function AnimeDetailScreen({ route }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const status = useSelector((state) => state.animeCharacters.status);
    const animeCharacters = useSelector((state) => state.animeCharacters.characters || []);

    useEffect(() => {
        dispatch(fetchAnimeCharacters(item.mal_id));
    }, [dispatch, item.mal_id]);

    const renderCharacter = ({ item }) => {
        if (!item.character || !item.character.images || !item.character.images.webp || !item.character.images.webp.image_url || !item.character.name || !item.role) {
            return null;
        }

        return (
            <View style={styles.characterContainer}>
                <Image source={{ uri: item.character.images.webp.image_url }} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.character.name}</Text>
                <Text style={styles.roleStyle}>{item.role}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <Image source={{ uri: item.images.webp.large_image_url }} style={styles.headerImage} />
                    <View style={styles.headerOverlay}>
                        <Text style={styles.headerTitle}>{item.title}</Text>
                        {item.title_english && <Text style={styles.headerSubtitle}>{item.title_english}</Text>}
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.synopsis}>{item.synopsis}</Text>
                    {status === 'succeeded' && animeCharacters.length > 0 && (
                        <>
                            <Text style={styles.sectionHeader}>Characters</Text>
                            <FlatList
                                data={animeCharacters}
                                renderItem={renderCharacter}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.characterList}
                            />
                        </>
                    )}
                    <Text style={styles.sectionHeader}>Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Score:</Text>
                        <Text style={styles.detailValue}>{item.score}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Rank:</Text>
                        <Text style={styles.detailValue}>{item.rank}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Popularity:</Text>
                        <Text style={styles.detailValue}>{item.popularity}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Members:</Text>
                        <Text style={styles.detailValue}>{item.members}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Favorites:</Text>
                        <Text style={styles.detailValue}>{item.favorites}</Text>
                    </View>
                    <Text style={styles.sectionHeader}>Genres</Text>
                    <Text style={styles.detailText}>
                        {item.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
                    </Text>
                    <Text style={styles.sectionHeader}>Studios</Text>
                    <Text style={styles.detailText}>
                        {item.studios?.map((studio) => studio.name).join(', ') || 'N/A'}
                    </Text>
                    {item.background && (
                        <>
                            <Text style={styles.sectionHeader}>Background</Text>
                            <Text style={styles.synopsis}>{item.background}</Text>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
