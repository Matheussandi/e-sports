import { useEffect, useState, FormEvent } from 'react';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';

import { CaretDown, Check, GameController, X } from 'phosphor-react';

import { Input } from './Form/Input';
import { GameProps } from '../App';

import axios from 'axios';

interface IGame {
    id: string;
    title: string;
}

interface Props {
    game: GameProps;
    handleClose: () => void;
}

export function PostAdModal() {
    const [games, setGames] = useState<IGame[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [userDiscord, setUserDiscord] = useState<string>('')

    useEffect(() => {
        axios('http://localhost:3333/games').then(res => {
            setGames(res.data)
        })
    }, [])

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // validação simples
        if (!data.name || !data.yearsPlaying || !data.discord || weekDays.length === 0 || !data.hourStart || !data.hourEnd) {
            alert("Insira todos os dados corretamente!");
            return;
        }

        if (data.name.toString().length > 12) {
            alert("Nome com muitos caracteres!");
            return;
        }

        if (userDiscord.length > 20 || userDiscord.indexOf('#') === -1) {
            alert("Discord inválido!");
            return;
        }

        if (weekDays.length > 4) {
            alert("Só é possível registrar no máximo 4 dias.");
            return;
        }

        if (data.yearsPlaying.toString().length > 2) {
            alert("Tempo de jogo inválido!");
            return;
        }

        console.log(data.gameId)

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(String),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert("Anúncio criado com sucesso!");
        } catch (err) {
            console.log(err);
            alert("Error ao criar o anúncio.");
        }
    }



    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-4 px-12 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <div className='relative'>
                        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                        <div className='absolute top-0 right-0'>
                            <Dialog.Close>
                                <X />
                            </Dialog.Close>
                        </div>
                    </div>

                    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="game" className="font-semibold">Qual o game?</Label>
                            <Select.Root name="game">
                                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between" aria-label="Jogo">
                                    <Select.Value className="text-zinc-500" placeholder="Selecione o jogo que deseja jogar" />
                                    <CaretDown size={20} />
                                </Select.Trigger>

                                <Select.Portal>
                                    <Select.Content className="bg-zinc-900 rounded text-sm text-start py-3 px-6">
                                        <Select.Viewport className='text-white'>
                                            {
                                                games.map(game => (
                                                    <Select.Item className="focus:bg-violet-500 outline-none" key={game.id} value={game.id}>
                                                        <Select.ItemText>{game.title}</Select.ItemText>
                                                    </Select.Item>
                                                ))
                                            }
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Seu nome ou nickname</Label>
                            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
                                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="discord">Qual seu Discord?</Label>
                                <Input
                                    name="discord"
                                    id="discord"
                                    placeholder="Usuario#0000"
                                    value={userDiscord}
                                    onChange={(e) =>
                                        setUserDiscord(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="weekDays">Quando costuma jogar?</Label>
                                <ToggleGroup.Root
                                    type="multiple"
                                    className="flex gap-2 center"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        value="Dom"
                                        title="Domingo"
                                        className={`p-2 rounded ${weekDays.includes('Dom') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Dom
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Seg"
                                        title="Segunda"
                                        className={`p-2 rounded ${weekDays.includes('Seg') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Seg
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Ter"
                                        title="Terça"
                                        className={`p-2 rounded ${weekDays.includes('Ter') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Ter
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Qua"
                                        title="Quarta"
                                        className={`p-2 rounded ${weekDays.includes('Qua') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Qua
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Qui"
                                        title="Quinta"
                                        className={`p-2 rounded ${weekDays.includes('Qui') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Qui
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Sex"
                                        title="Sexta"
                                        className={`p-2 rounded ${weekDays.includes('Sex') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Sex
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="Sab"
                                        title="Sábado"
                                        className={`p-2 rounded ${weekDays.includes('Sab') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Sab
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="discord">Qual horário do dia?</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>

                        <Label className="mt-2 flex gap-2 items-center text-sm">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => {
                                    checked === true
                                        ? setUseVoiceChannel(true)
                                        : setUseVoiceChannel(false)
                                }}
                                className="w-6 h-6 p-1 rounded bg-zinc-900"
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </Label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close
                                type="button"
                                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                            >
                                Cancelar
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                <GameController size={24} />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    )
}