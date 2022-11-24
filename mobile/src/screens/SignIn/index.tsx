import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import {
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE
} from '@env';

import logoImg from '../../assets/logo-nlw-esports.png';
import { DiscordLogo } from 'phosphor-react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
}

export function SignIn() {
  const navigation = useNavigation();

  async function handleDiscordSignIn() {
    try {
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;
      
      if (params.access_token) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Bem-vindo"
          subtitle="Encontre seu duo e vamos jogar"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleDiscordSignIn}
        >
          <DiscordLogo
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text style={styles.buttonText}>
            Entrar com Discord
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}