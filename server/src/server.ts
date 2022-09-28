import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
// configurar cors para definir quais endereços podem fazer requisição
app.use(cors())

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.status(200).json(games);
})

app.post('/games/:id/ads', async (req, res) => {
    const gameId: string = req.params.id;
    const body = req.body;

    try {
        const ad = await prisma.ad.create({
            data: {
                gameId,
                name: body.name,
                weekDays: body.weekDays.join(','),
                useVoiceChannel: body.useVoiceChannel,
                yearsPlaying: body.yearsPlaying,
                hourStart: convertHourStringToMinutes(body.hourStart),
                hourEnd: convertHourStringToMinutes(body.hourEnd),
                discord: body.discord,
            }
        });
        return res.status(201).json(ad);
    } catch (error) {
        return res.status(400).json({ error: "Dados inválidos" });
    }
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    try {
        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: {
                gameId,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return res.status(200).json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd),
            }
        }));
    } catch (error) {
        return res.status(400).json({ error: "Jogo inválido" });
    }
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    try {
        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true,
            },
            where: {
                id: adId,
            }

        })

        return res.status(200).json(ad);
    } catch (error) {
        return res.status(400).json({ error: "Anúncio inválido" });
    }

})

app.listen('3333', () => {
    console.log('Listening on port 3333');
})