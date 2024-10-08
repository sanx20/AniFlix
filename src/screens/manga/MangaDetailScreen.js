import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaCharacters } from '../../redux/slices/mangaCharactersSlice';
import styles from './style';
import { addFavorite, removeFavorite } from '../../redux/slices/favouriteSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function MangaDetailScreen({ route }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const status = useSelector((state) => state.mangaCharacters.status);
    const mangaCharacters = useSelector((state) => state.mangaCharacters.characters || []);

    useEffect(() => {
        dispatch(fetchMangaCharacters(item.mal_id));
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

    const isFavorite = favorites.some((fav) => fav.mal_id === item.mal_id);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            Alert.alert('Remove favorite', 'Are you sure you want to remove this manga from favorites?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => dispatch(removeFavorite(item.mal_id)),
                },
            ]);
        } else {
            dispatch(addFavorite(item));
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.images.webp.large_image_url }} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
                            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={30} color={isFavorite ? '#BB86FC' : '#FFFFFF'} />
                        </TouchableOpacity>
                    </View>
                    {item.title_english && <Text style={styles.subtitle}>{item.title_english}</Text>}
                    {item.synopsis && <Text style={styles.synopsis}>{item.synopsis}</Text>}
                    {status === 'succeeded' && mangaCharacters.length > 0 && (
                        <>
                            <Text style={styles.sectionHeader}>Characters</Text>
                            <FlatList
                                data={mangaCharacters}
                                renderItem={renderCharacter}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.characterList}
                            />
                        </>
                    )}
                    <Text style={styles.sectionHeader}>Details</Text>
                    <Text style={styles.detailText}>Score: {item.score}</Text>
                    <Text style={styles.detailText}>Rank: {item.rank}</Text>
                    <Text style={styles.detailText}>Popularity: {item.popularity}</Text>
                    <Text style={styles.detailText}>Members: {item.members}</Text>
                    <Text style={styles.detailText}>Favorites: {item.favorites}</Text>
                    <Text style={styles.sectionHeader}>Published</Text>
                    <Text style={styles.detailText}>{item.published?.string || 'N/A'}</Text>
                    <Text style={styles.sectionHeader}>Genres</Text>
                    <Text style={styles.detailText}>
                        {item.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
                    </Text>
                    <Text style={styles.sectionHeader}>Authors</Text>
                    <Text style={styles.detailText}>
                        {item.authors?.map((author) => author.name).join(', ') || 'N/A'}
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
