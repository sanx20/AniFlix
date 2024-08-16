import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const AnimeComponent = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('AnimeDetail', { item });
    };
    return (
        <Pressable onPress={handlePress} style={styles.pressable}>
            <View style={styles.container}>
                <Image source={{ uri: item.images.webp.large_image_url }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.title_english && <Text style={styles.subtitle}>{item.title_english}</Text>}
                    <Text style={styles.detailText}>Score: {item.score}</Text>
                    <Text style={styles.detailText}>Rank: {item.rank}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default AnimeComponent;
