import React from 'react';
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

export function PostAd() {
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