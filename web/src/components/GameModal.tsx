import { useEffect, useState } from 'react';

import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';

import { Slider, SliderProps, Slide } from './Slider';

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

    const settings: SliderProps = {
        spaceBetween: 0,
        slidesPerView: 1.5,
        /* navigation: true, */
        loop: false,
        breakpoints: {
            768: {
                slidesPerView: 1.5,
            },
            1024: {
                slidesPerView: 2.5,
            },
        },
    }

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
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-4 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[360px] shadow-lg shadow-black/25 max-h-[600px] sm:w-[480] md:w-[500px]">
                    <div className="flex items-start justify-center relative">
                        <Dialog.Title className="overflow-hidden text-lg font-black text-transparent sm:text-2xl md:text-4xl text-ellipsis bg-nlw-gradient bg-clip-text mb-4">
                            {gameSelected?.title}
                        </Dialog.Title>
                        <div className='absolute top-0 right-0'>
                            <Dialog.Close>
                                <X />
                            </Dialog.Close>
                        </div>
                    </div>

                    <main className="min-h-[100px] overflow-auto max-h-[500px]">
                        <div className="flex items-center justify-center mx-3 mb-4 rounded-xl md:overflow-hidden">
                            <div className="flex justify-center w-full h-full px-4 mx-4">
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

                            <Slider settings={settings}>
                                {ads.map((ad) => (
                                    <Slide key={ad.id}>
                                        <div key={ad.id} className={"bg-zinc-900 rounded-2xl p-2 m-1"}>
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
                                    </Slide>
                                ))}
                            </Slider>
                        </div>
                    </main>

                    <div className="self-stretch w-full h-1 mt-4 bg-nlw-gradient"></div>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    )
}