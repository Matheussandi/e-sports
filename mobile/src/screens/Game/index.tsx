import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatchModal } from '../../components/DuoMatchModal';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [duoSelected, setDuoSelected] = useState('')

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://localhost:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://localhost:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => { setDuos(data) })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />

          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"

        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios para este jogo.
            </Text>
          )}
        />

        <DuoMatchModal
          visible={duoSelected.length > 0}
          discord={duoSelected}
          onClose={() => setDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}