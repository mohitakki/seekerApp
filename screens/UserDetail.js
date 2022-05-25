//import liraries
import { Button, Input, VStack, Text, Box } from 'native-base';
import React, { Component, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TextInput, Alert, BackHandler } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

// create a component
const UserDetails = ({ navigation }) => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // get fcmToken from AsyncStorage
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        Object.assign(data, { fcmToken: fcmToken });

        try {
            await firestore().collection('user').add(data).then(() => {
                console.log('User added!');
            });
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <View style={styles.container}>
            <VStack width={'80%'} space={5}>
                <Box>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input placeholder="Full Name" h={12} onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />
                        )}
                        name="full_name"
                    />
                    {errors.full_name && <Text mt={2} color={'red.700'}>This field is required.</Text>}
                </Box>
                <Box>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input placeholder="Address" h={12} onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />
                        )}
                        name="address"
                    />
                    {errors.address && <Text mt={2} color={'red.700'}>This field is required.</Text>}
                </Box>
                <Button h={12} onPress={handleSubmit(onSubmit)}>Submit</Button>
            </VStack>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
});

//make this component available to the app
export default UserDetails;
