import express from 'express';

const app = express();

app.get('/ads', (req, res) => {
    return res.json([
        { name: 'João', age: 24},
        { name: 'Marcos', age: 18},
        { name: 'Elias', age: 32},
        { name: 'Maria', age: 26},
    ])
})

app.listen('3333', () => {
    console.log('Listening on port 3333');
})