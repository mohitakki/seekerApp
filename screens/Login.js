//import liraries
import { Button, VStack } from 'native-base';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { userAction } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

// create a component
const Login = ({ navigation }) => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const userInfo = await GoogleSignin.signInSilently();
      dispatch(userAction(userInfo));
      navigation.navigate('Home');
    }

  }, [])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      navigation.navigate('User', { user: userInfo?.user });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };
  return (
    <View style={styles.container}>
      <VStack space={20}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {/* <Button onPress={signIn} >Login with Google</Button> */}
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </VStack>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: '35%',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

//make this component available to the app
export default Login;
