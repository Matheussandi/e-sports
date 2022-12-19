import React, { useEffect, useState } from 'react';

import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ControlledCheckBoxWeekDays } from '../ControlledCheckBoxWeekDays';
import { ControlledInput } from '../ControlledInput';
import { CheckBox } from '../CheckBox';

import { GameController, WarningCircle } from 'phosphor-react-native';
import { MaterialIcons } from '@expo/vector-icons';

import axios from 'axios';

import { Picker } from '@react-native-picker/picker';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { THEME } from '../../theme';
import { styles } from './styles';

interface IGame {
  id: string;
  title: string;
}

export interface IDiscordID {
  username: string;
  discriminator: string;
}

type FormData = {
  name: string;
  yearsPlaying: number;
  userDiscord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

const schema = yup.object({
  name: yup.string().required("Informe seu nome ou nickname"),
  yearsPlaying: yup.number().positive("Tempo de jogo inválido").integer().required("Informe seu tempo de jogo"),
  hourStart: yup.string().required("Informe seu horário início"),
  hourEnd: yup.string().when('hourStart', (hourStart, schema) => {
    return schema.test({
      test: (hourEnd: string) => !!hourStart && hourEnd > hourStart,
      message: "Horário inválido"
    })
  }).notOneOf([yup.ref('hourStart'), null], "Horário igual ao de início")
    .required('Informe seu horário de fim'),
}).required();

export function Form({ username, discriminator }: IDiscordID) {
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [weekDays, setWeekDays] = useState<string[] | any>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const optionsIndivudual = [{ text: 'Costumo me conectar ao chat de voz', id: 1 }];
  const optionsDays = [
    { id: 0, text: 'Dom', value: 'Dom' },
    { id: 1, text: 'Seg', value: 'Seg' },
    { id: 2, text: 'Ter', value: 'Ter' },
    { id: 3, text: 'Qua', value: 'Qua' },
    { id: 4, text: 'Qui', value: 'Qui' },
    { id: 5, text: 'Sex', value: 'Sex' },
    { id: 6, text: 'Sab', value: 'Sab' },
  ];

  const navigation = useNavigation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchGameName() {
    await axios('http://localhost:3333/games').then(res => {
      setGames(res.data);
    })
  }

  async function handlePostAd(data: FormData) {
    if (weekDays.length === 0) {
      Alert.alert("Dados inválido", "Insira pelo menos um dia da semana")
      return;
    }

    if (weekDays.length > 4) {
      Alert.alert("Dados inválido", "Número de dias selecionados ultrapassou o limite")
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: `${username}#${discriminator}`,
        weekDays: weekDays.map(String),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })

      Alert.alert("Sucesso", "Anúncio criado com sucesso!");

      reset();
    } catch (err) {
      console.log(err);
      alert("Error ao criar o anúncio.");
    }
  }

  useEffect(() => {
    fetchGameName();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual o game?</Text>
      <Picker
        style={{ width: '100%', backgroundColor: '#18181B', color: '#FFF', marginBottom: 16 }}
        selectedValue={selectedGame}
        onValueChange={(value) =>
          setSelectedGame(value)
        }>
        {
          games.map(game => {
            return <Picker.Item key={game.id} label={game.title} value={game.id} />
          })
        }
      </Picker>

      <Text style={styles.title}>Seu nome ou nickname</Text>
      <ControlledInput
        name='name'
        maxLength={25}
        control={control}
        placeholder="Como te chamam nos jogos"
        error={errors.name}
        autoCapitalize='none'
      />


      <Text style={styles.title}>Joga há quantos anos?</Text>
      <ControlledInput
        name='yearsPlaying'
        keyboardType='numeric'
        maxLength={2}
        control={control}
        placeholder="Tudo bem ser zero"
        error={errors.yearsPlaying}
      />


      <Text style={styles.title}>Qual seu discord?</Text>
      <ControlledInput
        name='userDiscord'
        maxLength={20}
        editable={false}
        value={`${username}#${discriminator}`}
        control={control}
      />

      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={styles.title}>Quando costuma jogar?</Text>
        <TouchableOpacity style={{ marginHorizontal: 6 }} onPress={() => setVisibleModal(true)}>
          <WarningCircle size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        visible={visibleModal}
        onRequestClose={() => { setVisibleModal(false) }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => { setVisibleModal(false) }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => { setVisibleModal(false) }}
              >
                <MaterialIcons
                  name="close"
                  size={20}
                  color={THEME.COLORS.CAPTION_500}
                />
              </TouchableOpacity>

              <Text style={styles.modalText}>
                Selecione no máximo 4 dias.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      
      <ControlledCheckBoxWeekDays
        name='weekDays'
        control={control}
        options={optionsDays}
        onChange={(op: string) => setWeekDays(op)}
        multiple
      />

      <Text style={styles.title}>Horário de início</Text>
      <ControlledInput
        name='hourStart'
        maxLength={5}
        control={control}
        placeholder="10:00"
        error={errors.hourStart}
      />

      <Text style={styles.title}>Horário de fim</Text>
      <ControlledInput
        name='hourEnd'
        maxLength={5}
        control={control}
        placeholder="22:00"
        error={errors.hourEnd}
      />

      <CheckBox
        options={optionsIndivudual}
        onChange={(op: number) => op == 1
          ? setUseVoiceChannel(true)
          : setUseVoiceChannel(false)
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handlePostAd)}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
          style={{ marginHorizontal: 5 }}
        />

        <Text style={styles.buttonText}>
          Encontrar duo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={handleGoBack}
      >

        <Text style={styles.buttonText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
}