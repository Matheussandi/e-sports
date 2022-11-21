import React, { useEffect, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

import { Control, Controller, FieldError } from "react-hook-form";

import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type Props = SelectProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
}

export type SelectProps = {
  value?: string;
}

interface IGame {
  id: string;
  title: string;
}


export function Select({ control, name, error, ...rest }: Props) {
  const [games, setGames] = useState<IGame[]>([]);

  const [selectedGame, setSelectedGame] = useState();

  useEffect(() => {
    axios('http://localhost:3333/games').then(res => {
      setGames(res.data);
    })
  }, [])

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            style={{ width: '100%', backgroundColor: '#18181B', color: '#FFF' }}
            selectedValue={selectedGame}
            placeholder="Selecione o jogo que deseja jogar"
            onValueChange={(selected) =>
              setSelectedGame(selected)
            }>
              
            {
              games.map(game => {
                return <Picker.Item key={game.id} label={game.title} value={game.id} />
              })
            }
          </Picker>
        )}
      />
      <View>
        <Text style={{color: '#FFF'}}>Jogo selecionado foi: {selectedGame}</Text>
      </View>
    </>
  );
}