import { useEffect, useState } from 'react';

import logoImg from './assets/logo-nlw-esports.svg';

import { CreatedAtBanner } from './components/CreatedAtBanner';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import { ModalPostAd } from './components/ModalPostAd';

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

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
        <img src={logoImg} alt="" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
        </h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
          {
            games.map((game) => {
              return (
                <GameBanner
                  key={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              )
            })
          }
        </div>

        <Dialog.Root>
          <CreatedAtBanner />

          <ModalPostAd />
        </Dialog.Root>
      </div>
    </>
  )
}
