import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import axios from 'axios';

import logoImg from './assets/logo-nlw-esports.svg';

import { CreatedAtBanner } from './components/CreatedAtBanner';
import { PostAdModal } from './components/PostAdModal';
import { GameBanner } from './components/GameBanner';
import { GameModal } from './components/GameModal';

import * as Dialog from '@radix-ui/react-dialog';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import './styles/main.css';

export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number,
  }
}

export default function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [gameSelected, setGameSelected] = useState<GameProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [ref] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'free',
    loop: false,
    breakpoints: {
      "(min-width: 200px)": {
        slides: { perView: 2.2, spacing: 5 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3.5, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 4.5, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5.5, spacing: 10 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 6.5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  })

  useEffect(() => {
    async function loadData() {
      await axios('http://localhost:3333/games')
        .then(res => { setGames(res.data) })
        .finally(() => setIsLoading(false));
    }

    loadData();
  }, [])

  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
        <img src={logoImg} alt="" />

        <h1 className="text-4xl text-white font-black mt-20 md:text-6xl">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
        </h1>

        {
          isLoading
            ? (
              <div>
                <ReactLoading type={'spinningBubbles'} color={'#8B5CF6'} className='my-10 ' />
              </div>
            )
            : (
              <div ref={ref} className="keen-slider mt-8">
                {
                  games.map((game) => {
                    return (
                      <div key={game.id} className="keen-slider__slide">
                        <GameBanner
                          key={game.id}
                          title={game.title}
                          bannerUrl={game.bannerUrl}
                          adsCount={game._count.ads}
                          handleClick={() => setGameSelected(game)}
                        />
                      </div>
                    )
                  })
                }
              </div>
            )
        }

        <Dialog.Root
          open={!!gameSelected?.id}
          onOpenChange={() => setGameSelected(undefined)}
        >
          <GameModal gameSelected={gameSelected} />
        </Dialog.Root>

        <Dialog.Root>
          <CreatedAtBanner />

          <PostAdModal />
        </Dialog.Root>
      </div>
    </>
  )
}