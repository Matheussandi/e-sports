import { useEffect, useState } from 'react';

import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';

import { LabelValue } from './LabelValue';
import { X } from 'phosphor-react';
import { GameProps } from '../App';

interface Props {
    gameSelected: GameProps | undefined;
}

interface Ads {
    id: string;
    name: string;
    weekDays: string[];
    useVoiceChannel: boolean;
    yearsPlaying: number;
    hourStart: number;
    hourEnd: number;
    discord?: string;
}

export function GameModal({ gameSelected }: Props) {
    const [ads, setAds] = useState<Ads[]>([]);
    const [adSelected, setAdSelected] = useState<string | null>(null);

    function getGameSelected() {
        if (!gameSelected) {
            setAds([]);
            return;
        }

        axios(`http://localhost:3333/games/${gameSelected.id}/ads`).then((response) => {
            setAds(response.data);
        });
    }

    useEffect(() => {
        getGameSelected();
    }, [gameSelected]);

    useEffect(() => {
        async function getDiscord() {
            if (!adSelected) return;

            await axios(`http://localhost:3333/ads/${adSelected}/discord`).then((response) => {
                // atualiza state de anuncios
                const newAds = ads.map((ad) => {
                    if (ad.id === adSelected) {
                        ad.discord = response.data.discord;
                    }

                    return ad;
                });

                setAds(newAds);
                setAdSelected(null);
            });
        }

        getDiscord();
    }, [adSelected, ads]);

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bg-black/60 inset-0" />

                <Dialog.Content className="w-full h-full md:w-[80%] max-w-2xl md:max-h-[500px] md:h-[80%] grid md:rounded-md grid-rows-[80px_minmax(100px,_1fr)] m-auto bg-[#2a2634] shadow-2xl shadow-black/50 fixed py-6 rounded-lg px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-start justify-center relative">
                        <Dialog.Title className="overflow-hidden text-4xl font-black text-transparent md:text-ellipsis bg-nlw-gradient bg-clip-text mb-4">
                            {gameSelected?.title}
                        </Dialog.Title>
                        <div className='absolute top-0 right-0'>
                            <Dialog.Close>
                                <X />
                            </Dialog.Close>
                        </div>
                    </div>

                    <main className="min-h-[100px] grid grid-cols-[1fr] px-0 md:grid-cols-[1fr_1fr] overflow-auto">
                        <div className="flex items-center justify-center mx-3 rounded-xl md:overflow-hidden">
                            <div className="flex justify-center w-full h-full px-4">
                                <img className='rounded' src={gameSelected?.bannerUrl} alt="" />
                            </div>
                        </div>
                        <div className="md:overflow-auto">

                            {ads.length === 0 && (
                                <div className='text-center'>
                                    <LabelValue label="Nenhum anúncio encontrado">
                                        Não existe anúncio para este jogo.
                                    </LabelValue>
                                </div>
                            )}

                            {
                                ads.map((ad) => (
                                    <div key={ad.id} className={"bg-zinc-900 rounded-2xl p-2 mt-2 mr-0 md:mt-0 mb-2 md:mr-5"}>
                                        <LabelValue label="Name">
                                            {ad.name}
                                        </LabelValue>

                                        <LabelValue label="Discord">
                                            <div
                                                onClick={() => setAdSelected(ad.id)}
                                                className="flex items-center gap-3 hover:cursor-pointer"
                                            >
                                                <div className="text-sm font-light">
                                                    {ad.discord ?? "clique aqui"}
                                                </div>
                                            </div>
                                        </LabelValue>

                                        <LabelValue label="Tempo de Jogo">
                                            {ad.yearsPlaying > 0
                                                ? ad.yearsPlaying + " ano(s)"
                                                : "recente"}
                                        </LabelValue>
                                        <LabelValue label="Disponibilizade">
                                            <div className='flex flex-col gap-2'>{ad.weekDays.join(',')}</div>
                                            <div className="text-sm font-normal">
                                                {ad.hourStart}
                                                {" "}
                                                -
                                                {" "}
                                                {ad.hourEnd}
                                            </div>
                                        </LabelValue>
                                        <LabelValue label="Chamada de áudio">
                                            <span
                                                className={`${ad.useVoiceChannel
                                                    ? "text-green-700"
                                                    : "text-red-700"
                                                    }`}
                                            >
                                                {ad.useVoiceChannel ? "Sim" : "Não"}
                                            </span>
                                        </LabelValue>
                                    </div>
                                ))
                            }
                        </div>
                    </main>

                    <div className="self-stretch w-full h-1 mt-4 bg-nlw-gradient"></div>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    )
}