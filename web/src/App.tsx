import { useEffect, useState } from 'react';

import axios from 'axios';

import logoImg from './assets/logo-nlw-esports.svg';

import { CreatedAtBanner } from './components/CreatedAtBanner';
import { ModalPostAd } from './components/ModalPostAd';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';

import { Slider, SliderProps, Slide } from './components/Slider';
import './styles/main.css';

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

  const settings: SliderProps = {
    spaceBetween: 12,
    slidesPerView: 2,
    /* navigation: true, */
    loop: false,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
  },
  }

  useEffect(() => {
    axios('http://localhost:3333/games').then(res => {
      setGames(res.data)
    })
  }, [])

  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
        <img src={logoImg} alt="" />

        <h1 className="text-4xl text-white font-black mt-20 md:text-6xl">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
        </h1>

        <div className='mt-16 max-w-sm md:max-w-3xl lg:max-w-6xl px-12'>
          <Slider settings={settings}>
            {games.map((game) => (
              <Slide key={game.title}>
                <div className="relative rounded">
                  <GameBanner
                    key={game.id}
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}
                  />
                </div>
              </Slide>
            ))}
          </Slider>
        </div>

        <Dialog.Root>
          <CreatedAtBanner />

          <ModalPostAd />
        </Dialog.Root>
      </div>
    </>
  )
}
