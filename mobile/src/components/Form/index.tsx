import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { ControlledInput } from '../ControlledInput';

import { GameController } from 'phosphor-react-native';

import { Picker } from '@react-native-picker/picker';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckBox } from '../CheckBox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Select } from '../Select';

interface IGame {
  id: string;
  title: string;
}

type FormData = {
  name: string;
  yearsPlaying: number;
  userDiscord: string;
  weekDays: string;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

const schema = yup.object({
  name: yup.string().required("Informe seu nome ou nickname"),
  yearsPlaying: yup.number().positive().integer().required("Informe seu tempo de jogo"),
  userDiscord: yup.string().required("Informe o seu discord"),
  hourStart: yup.string().required("Informe seu horário início"),
  hourEnd: yup.string().required("Informe seu horário de saída"),
  weekDays: yup.string().required("Informe os dias da semana jogado"),
}).required();

export function Form() {
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const optionsIndivudual = [{ text: 'Costumo me conectar ao chat de voz', id: 1 }];

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });


  const navigation = useNavigation();

  useEffect(() => {
    axios('http://192.168.29.2:3333/games').then(res => {
      setGames(res.data);
    })
  }, [])

  function handleGoBack() {
    navigation.goBack();
  }

  async function handlePostAd(data: FormData) {
    console.log(selectedGame)
    console.log(useVoiceChannel)
    console.log(data);

    if (data !== undefined) {
      try {
        await axios.post(`http://192.168.29.2:3333/games/${selectedGame}/ads`, {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.userDiscord,
          weekDays: weekDays.map(String),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: useVoiceChannel,
        })

        alert("Anúncio criado com sucesso!");

        reset();
      } catch (err) {
        console.log(err);
        alert("Error ao criar o anúncio.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual o game?</Text>
      <Picker
        style={{ width: '100%', backgroundColor: '#18181B', color: '#FFF', marginBottom: 16 }}
        selectedValue={selectedGame}
        placeholder="Selecione o jogo que deseja jogar"
        onValueChange={(value) =>
          setSelectedGame(value)
        }>
        {
          games.map(game => {
            return <Picker.Item key={game.id} label={game.title} value={game.id} />
          })
        }
      </Picker>
      {/*       <View>
        <Text style={{ color: '#FFF' }}>Jogo selecionado foi: {selectedGame}</Text>
      </View> */}

      <Text style={styles.title}>Seu nome ou nickname</Text>
      <ControlledInput
        name='name'
        control={control}
        placeholder="Como te chamam nos jogos"
        error={errors.name}
        autoCapitalize='none'
      />

      <Text style={styles.title}>Já há quanto anos?</Text>
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
        control={control}
        placeholder="Usuario#000"
        error={errors.userDiscord}
      />

      <Text style={styles.title}>Quando costuma jogar?</Text>
      <ControlledInput
        name='weekDays'
        control={control}
        placeholder="Seg, Ter, Qua"
        error={errors.weekDays}
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
        error={errors.hourStart}
      />

      <CheckBox
        key={undefined}
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