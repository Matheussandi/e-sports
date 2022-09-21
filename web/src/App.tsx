import { useEffect, useState } from 'react';

import axios from 'axios';

import logoImg from './assets/logo-nlw-esports.svg';

import { CreatedAtBanner } from './components/CreatedAtBanner';
import { ModalPostAd } from './components/ModalPostAd';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';

import { useKeenSlider } from 'keen-slider/react' 
import 'keen-slider/keen-slider.min.css'

import './styles/main.css';
import { SliderGames } from './components/SliderGames';

interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number,
  }
}

export default function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 6},
    loop: false,
  });

  useEffect(() => {
    axios('http://localhost:3333/games').then(res => {
      setGames(res.data)
    })
  }, [])

  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
        <img src={logoImg} alt="" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
        </h1>

        <SliderGames />

        <Dialog.Root>
          <CreatedAtBanner />

          <ModalPostAd />
        </Dialog.Root>
      </div>
    </>
  )
}
