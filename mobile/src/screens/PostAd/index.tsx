import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { Background } from '../../components/Background';
import { Form } from '../../components/Form';

import { styles } from './styles';

import { useRoute } from '@react-navigation/native';
import { AuthResponse } from '../SignIn';
import { string } from 'yup';

export interface ProfileProps {
    id: string;
    username: string;
    discriminator: string;
}

export function PostAd() {
    const [profile, setProfile] = useState<ProfileProps>({
        id: '',
        username: '',
        discriminator: '',
      });

    const route = useRoute();
    const authDiscord = route.params as AuthResponse;

    async function fetchProfile() {
        await fetch('https://discord.com/api/users/@me', {
          headers: {
            'authorization': `Bearer ${authDiscord.params}`
          }
        })
          .then(response => response.json())
          .then(data => setProfile(data))
      }

      useEffect(() => {
        fetchProfile()
      }, [])  

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior={'padding'}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Form key={profile.id} username={profile.username} discriminator={profile.discriminator}/>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </ScrollView>

            </SafeAreaView>
        </Background>
    );
}