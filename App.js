import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/login/LoginScreen';
import MangaListScreen from './src/screens/manga_list/MangaListScreen';
import AnimeListScreen from './src/screens/anime_list/AnimeListScreen'; // Import your Anime screen
// import NewsScreen from './src/screens/news/NewsScreen'; // Import your News screen
import FavoritesScreen from './src/screens/favorites/FavoritesScreen';
import MangaDetailScreen from './src/screens/manga/MangaDetailScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/FirebaseConfig';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimeDetailScreen from './src/screens/anime/AnimeDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Manga') {
            iconName = 'book-outline';
          } else if (route.name === 'Anime') {
            iconName = 'tv-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Manga" component={MangaListScreen} />
      <Tab.Screen name="Anime" component={AnimeListScreen} />
      {/* <Tab.Screen name="News" component={NewsStack} /> */}
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <>
              <Stack.Screen name="Main" component={TabNavigator} options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: '',
                headerTintColor: '#fff',
              }} />
              <Stack.Screen name="MangaDetail" component={MangaDetailScreen} options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: 'Manga Detail',
                headerTintColor: '#fff',
              }} />
              <Stack.Screen name="AnimeDetail" component={AnimeDetailScreen} options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: 'Anime Detail',
                headerTintColor: '#fff',
              }} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}