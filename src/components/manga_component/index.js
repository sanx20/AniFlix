import { View, Text, Image, Pressable } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function MangaComponent({ item }) {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('MangaDetail', { item });
    };

    return (
        <Pressable onPress={handlePress} style={styles.pressable}>
            <View style={styles.gridItem}>
                <Image source={{ uri: item.images.webp.image_url }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                    <Text style={styles.score}>⭐ {item.score}</Text>
                </View>
            </View>
        </Pressable>
    );
}
