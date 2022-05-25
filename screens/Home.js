//import liraries
import React, { Component, useEffect, useRef } from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { Box, Button, Text } from 'native-base';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


// create a component
const Home = ({ route, navigation }) => {

      // canGoBack state
      const canGoBack = useSelector(state => state.user.canGoBack);
      console.log(canGoBack);
      const viewRef = useRef();

  // const { user } = route.params;
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(async () => {
    const users = await firestore().collection('user').get();
    dispatch(userAction(users.docs[0].data()));
  }, [])

  // google sign out
  const handleGoogleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate('Login')
    } catch (error) {
      console.error(error);
    }
  }

  const alertExit = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };

  useEffect(() => {
    const backAction = () => {
     
      canGoBack ? navigation.goBack() : alertExit();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);



  return (
    <View style={styles.container}>
      <Box h={120} w={'80%'} mx={'auto'} bg={'gray.600'} borderRadius={20} py={4}>
        <Text color={'white'} textAlign={'center'}>Welcome</Text>
        <Text color={'white'} textAlign={'center'} fontSize={'2xl'}>{user?.full_name}</Text>
        <Text color={'white'} textAlign={'center'} fontSize={'xl'}>{user?.address}</Text>
        <Button onPress={handleGoogleSignOut}>Logout</Button>
      </Box>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Home;
