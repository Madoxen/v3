import { types } from '@babel/core';

import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Image } from 'react-native';
import {Text} from 'react-native-paper';
import { Checkbox, FAB } from 'react-native-paper';

import ItemList from '../components/ItemList';

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleSignInButton from '../components/GoogleSignInButton';


GoogleSignin.configure({
    webClientId: '954680374421-jthdujvl5p1cjjgvj6bmgctogq7i2hm0.apps.googleusercontent.com',
});



//TODO: callbacks and shit props
//TODO: FAB onPress change scene to Add Item View
//TODO: Hook up to firebase 
const SignInScene: React.FC<any> = ({ navigation }) => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    async function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);

        if (user != null && initializing == false) {
            //Check if user document exists
            let profileData = await firestore().collection('users').doc(user.uid).get();
            if (profileData.exists == false) {
                firestore().collection('users').doc(user.uid).set({
                    name: user.displayName
                }).catch((e) => console.log(e));
            }
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (initializing == false && user != null) {
            navigation.reset({
                index: 0,
                routes: [{name: "Main"}],
            });
        }
    }, [initializing, user])

    const onSignInButtonClick = () => {
        if (initializing == false && user != null) {
            navigation.reset({
                index: 0,
                routes: [{name: "Main"}],
            });
        }
    }

    return (
        <View >
            <Text style={{fontSize: 250, textAlign: "center", zIndex: -1}}>V3</Text>
            <Text style={{fontSize: 11, textAlign: "center", color: "#444444"}}>Veni, vidi, vici</Text>
            <Text style={{fontSize: 16, textAlign: "center"}}>Keep track of your entertainment collections!</Text>
            <View style={{alignSelf: 'center', justifyContent: "center", height:"50%"}}>
                <GoogleSignInButton onClick={onSignInButtonClick} />
            </View>
        </View>
    );

}
export default SignInScene;