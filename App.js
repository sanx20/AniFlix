import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/login/LoginScreen';
import MangaListScreen from './src/screens/manga_list/MangaListScreen';
import AnimeListScreen from './src/screens/anime_list/AnimeListScreen';
import FavoritesScreen from './src/screens/favorites/FavoritesScreen';
import MangaDetailScreen from './src/screens/manga/MangaDetailScreen';
import AnimeDetailScreen from './src/screens/anime/AnimeDetailScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { fetchFavorites } from './src/redux/slices/favouriteSlice';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const favoritesStatus = useSelector((state) => state.favorites.status);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);

      if (user) {
        dispatch(fetchFavorites());
      }

      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked || favoritesStatus === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#BB86FC" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: 'AniFlix',
                headerTintColor: '#BB86FC',
                headerTitleStyle: { fontWeight: 'bold', },
              }}
            />
            <Stack.Screen
              name="MangaDetail"
              component={MangaDetailScreen}
              options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: 'Manga Detail',
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="AnimeDetail"
              component={AnimeDetailScreen}
              options={{
                headerStyle: { backgroundColor: 'black' },
                headerTitle: 'AniFlix',
                headerTintColor: '##BB86FC',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithRedux;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
