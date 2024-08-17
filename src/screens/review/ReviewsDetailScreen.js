import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function ReviewsDetailScreen({ route }) {
    const { review } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image
                    source={{ uri: review.entry.images.jpg.large_image_url }}
                    style={styles.animeImage}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{review.entry.title}</Text>
                    <Text style={styles.username}>by {review.user.username}</Text>
                    <Text style={styles.score}>Score: {review.score}</Text>
                    <Text style={styles.reviewText}>{review.review}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    animeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    detailsContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    username: {
        fontSize: 16,
        color: '#BBBBBB',
        marginBottom: 6,
    },
    score: {
        fontSize: 16,
        color: '#BB86FC',
        marginBottom: 16,
    },
    reviewText: {
        fontSize: 16,
        color: '#DDDDDD',
        lineHeight: 22,
    },
});
