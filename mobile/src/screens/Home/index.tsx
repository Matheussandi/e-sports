import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, IGameCards } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<IGameCards[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: IGameCards) {
    navigation.navigate('Game', { id, title, bannerUrl });
  }

  useEffect(() => {
    // colocar o ip da máquina no localhost
    fetch('http://192.168.29.2:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre sua dupla"
          subtitle="Selecione o game que deseja jogar..."
        />

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
    </Background>
  );
}