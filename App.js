import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/LoginScreen';
import { MangaListScreen } from './src/screens/manga_list/MangaListScreen';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/FirebaseConfig';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();
const authenticatedUserStack = createNativeStackNavigator();

const AuthenticatedUserStack = () => {
  return (
    <authenticatedUserStack.Navigator>
      <authenticatedUserStack.Screen name='MangaListScreen' component={MangaListScreen} />
    </authenticatedUserStack.Navigator>
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
        <Stack.Navigator initialRoute='LoginScreen'>
          {user ? (
            <Stack.Screen name='AuthenticatedUserStack' component={AuthenticatedUserStack} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}