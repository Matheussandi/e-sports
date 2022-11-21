import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Image, TouchableOpacity, View, TextInput, Platform, ScrollView } from 'react-native';
import { Background } from '../../components/Background';

import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { ControlledInput } from '../../components/ControlledInput';
import { Form } from '../../components/Form';

import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';


export function PostAd() {
    const { control, handleSubmit } = useForm();

    const navigation = useNavigation();

    function handlePostAd() {

    }

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior={'padding'}
                        >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Form />
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </ScrollView>

            </SafeAreaView>
        </Background>
    );
}