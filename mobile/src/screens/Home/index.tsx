import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { CalendarPlus, SignOut } from 'phosphor-react-native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, IGameCards } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

import { AuthResponse } from '../SignIn';

export interface ProfileProps {
  id: string;
  avatar: string;
}

export function Home() {
  const [profile, setProfile] = useState<ProfileProps>({
    id: '',
    avatar: ''
  });
  const [games, setGames] = useState<IGameCards[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const authDiscord = route.params as AuthResponse;

  function handleOpenGame({ id, title, bannerUrl }: IGameCards) {
    navigation.navigate('Game', { id, title, bannerUrl });
  }

  function handleOpenPostAd() {
    navigation.navigate('PostAd', {
      params: authDiscord.params
    });
  }

  function handleLogout() {
    navigation.navigate('SignIn');
  }

  async function fetchGame() {
    await fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => { setGames(data) })
  }

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
    fetchGame()
    fetchProfile()
  }, [])

  const image = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
  const image2 = `https://cdn.discordapp.com/embed/avatars/0.png`

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            {
              profile.avatar !== null
                ? <Image source={{ uri: image }} style={styles.profile} />
                : <Image source={{ uri: image2 }} style={styles.profile} />
            }

            <TouchableOpacity onPress={handleLogout}>
              <SignOut
                color={THEME.COLORS.TEXT}
                size={24}
              />

            </TouchableOpacity>
          </View>
          <Image
            source={logoImg}
            style={styles.logo}
          />

          <Heading
            title="Encontre sua dupla"
            subtitle="Selecione o game que deseja jogar"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleOpenPostAd}
          >
            <CalendarPlus
              color={THEME.COLORS.TEXT}
              size={20}
            />

            <Text style={styles.buttonText}>
              Publicar anúncio
            </Text>
          </TouchableOpacity>

          <FlatList
            data={games}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            renderItem={({ item }) => (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}