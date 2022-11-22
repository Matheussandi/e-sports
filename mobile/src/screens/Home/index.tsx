import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { CalendarPlus, SignOut } from 'phosphor-react-native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, IGameCards } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Home() {
  const [games, setGames] = useState<IGameCards[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: IGameCards) {
    navigation.navigate('Game', { id, title, bannerUrl });
  }

  function handleOpenPostAd() {
    navigation.navigate('PostAd');
  }

  function handleLogout() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    // colocar o ip da máquina no localhost
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  })

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
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