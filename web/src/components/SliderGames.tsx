import React, { useEffect, useState } from "react"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import axios from "axios";
import { GameBanner } from "./GameBanner";

interface IGame {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number,
    }
}

export function SliderGames() {
    const [games, setGames] = useState<IGame[]>([]);
    const [ref] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "(min-width: 400px)": {
                slides: { perView: 3, spacing: 12 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 6, spacing: 24 },
            },
        },
        slides: { perView: 1 },
        loop: false,
    });

    useEffect(() => {
        axios('http://localhost:3333/games').then(res => {
            setGames(res.data)
        })
    }, [])

    return (
        <div ref={ref} className="mt-16 keen-slider">
            {
                games.map((game, index) => {
                    return (
                        <div key={index} className="keen-slider__slide relative rounded">
                            <GameBanner
                                key={game.id}
                                title={game.title}
                                bannerUrl={game.bannerUrl}
                                adsCount={game._count.ads}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}