import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';

import { useEffect, useState, FormEvent } from 'react';
import { Input } from './Form/Input';
import axios from 'axios';

import { CaretDown, Check, GameController, MagnifyingGlassPlus, X } from 'phosphor-react';
import { GameProps } from '../App';
import { ModalPostAd } from './ModalPostAd';
import { LabelValue } from './LabelValue';

import { Slider, SliderProps, Slide } from './Slider';

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
    const [modalCreateAd, setModalCreateAd] = useState(false);

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

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-4 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[360px] shadow-lg shadow-black/25 max-h-[600px] sm:w-[480] md:w-[520px]">
                    <div className="flex items-start justify-center">
                        <Dialog.Title className="overflow-hidden text-lg font-black text-transparent sm:text-2xl md:text-4xl text-ellipsis bg-nlw-gradient bg-clip-text mb-4">
                            {gameSelected?.title}
                        </Dialog.Title>
                        {/*                         <Dialog.Close>
                            <X />
                        </Dialog.Close> */}
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
                                        Não foi encontrado anúncios para este jogo.
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
                                                    {/*                                             <FaDiscord
                                                title="mostrar discord do usuário"
                                                className="text-blue-300 w-7 h-7"
                                            /> */}
                                                    <div className="text-sm font-light">
                                                        {ad.discord ??
                                                            "clique para visualizar"}
                                                    </div>
                                                </div>
                                            </LabelValue>

                                            <LabelValue label="Tempo de Jogo">
                                                {ad.yearsPlaying > 0
                                                    ? ad.yearsPlaying + " ano(s)"
                                                    : "recente"}
                                            </LabelValue>
                                            <LabelValue label="Disponibilizade">
                                                <div>{ad.weekDays}</div>
                                                {/*                                         <div className="text-sm font-normal">
                                            {convertMinutesNumberToHoursString(
                                                ad.hourStart
                                            )}{" "}
                                            -{" "}
                                            {convertMinutesNumberToHoursString(
                                                ad.hourEnd
                                            )}
                                        </div> */}
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