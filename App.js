import React, { useEffect } from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserDetails from './screens/UserDetail';
import Home from './screens/Home';
import { notificationListener, requestUserPermission } from './utils/notificationServices';



const App = () => {
  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])
  
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={UserDetails} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App