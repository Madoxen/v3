import React from 'react';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FAB } from 'react-native-paper';


interface IProps
{
    onClick? : any;
}

const GoogleSignInButton : React.FC<IProps> = (props : any) => {


    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        if(props.onClick !== undefined)
            props.onClick();

        // Sign-in the user with the credential
        let creds = await auth().signInWithCredential(googleCredential);
        
        //Check if user document exists
        let profileData = await firestore().collection('users').doc(creds.user.uid).get();
        if(profileData.exists == false)
        {
            let userDocRef = firestore().collection('users').doc(creds.user.uid);
            userDocRef.set({
                name: creds.user.displayName
            }).catch((e) => console.log(e));
        }

        return creds;
    }

    return (
        <Button
            title="Sign in with Google"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!')).catch((e) => console.log(e))}
        />
    );
}

export default GoogleSignInButton
