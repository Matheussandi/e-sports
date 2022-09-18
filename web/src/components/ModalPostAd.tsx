import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { CaretDown, Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface IGame {
    id: string;
    title: string;
}

export function ModalPostAd() {
    const [games, setGames] = useState<IGame[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

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

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert("Anúncio criado com sucesso!");
        } catch (err) {
            // console.log(err);
            alert("Error ao criar o anúncio.");
        }
    }

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            {/* <label htmlFor="game" className="font-semibold">Qual o game?</label> */}
                            <Label htmlFor="game" className="font-semibold">Qual o game?</Label>
                            <Select.Root name="game">
                                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between">
                                    <Select.Value className="text-zinc-500" placeholder="Selecione o game que deseja jogar" />
                                    <CaretDown size={20} />

                                    <Select.Content className="bg-zinc-900 py-3 px-6 rounded text-sm mt-5 flex text-start">
                                        {
                                            games.map(game => {
                                                return (
                                                    <Select.Item key={game.id} value={game.id}>
                                                        <Select.ItemText>{game.title}</Select.ItemText>
                                                    </Select.Item>
                                                )
                                            })
                                        }
                                    </Select.Content>
                                </Select.Trigger>
                            </Select.Root>
                            {/* <Input id="game" placeholder="Selecione o game que deseja jogar" /> */}

                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Seu nome ou nickname</label>
                            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord">Qual seu Discord?</label>
                                <Input name="discord" id="discord" placeholder="Usuario#0000" />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>
                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        value="0"
                                        title="Domingo"
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="1"
                                        title="Segunda"
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="2"
                                        title="Terça"
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="3"
                                        title="Quarta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="4"
                                        title="Quinta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="5"
                                        title="Sexta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="6"
                                        title="Sábado"
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="discord">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="mt-2 flex gap-2 items-center text-sm">
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
                        </label>

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