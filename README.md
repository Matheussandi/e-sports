# <p align="center">eSports</p>

<p align="justify">Aplicação para você encontrar seu duo, selecionando um jogo específico e escolhendo o jogador ideal para se divertir, ou então você tem a possibilidade de criar um anúncio e esperar que alguém te chame pelo discord.</p>

### <p align="center">Web</p>
<p align="center">
  <video src="https://user-images.githubusercontent.com/29473781/193426386-400433fe-a110-4f21-b149-01581362f01e.mp4"/>
  <br>
</p>

### <p align="center">Mobile</p>
<p align="center">
  <video src="https://user-images.githubusercontent.com/29473781/208524574-00c3ce38-138f-4dc7-8138-79c2fba70aca.mp4"/>
  <br>
</p>

<p align="center">

</p>

Construído através do deste [layout](https://www.figma.com/file/8yPqlNjGBpJ7sDSEma7Jm4/NLW-eSports-(Community)?node-id=0%3A1&t=7sZiMgKJOwNzPyWG-1).

# :pushpin: Recursos

- [x] Visualização dos jogos;
- [x] Controle deslizando nas imagens;
- [x] Verificação dos anúncios de um jogo específico;
- [x] Informações do anunciante;
- [x] Publicação de um novo anúncio;
- [x] Validação dos dados;
- [x] Responsividade.
 
# 👨‍💻 Tecnologias

- [Axios](https://axios-http.com/docs/intro)
- [Expo](https://expo.dev/)
- [Express](https://expressjs.com/pt-br/)
- [Keen-slider](https://keen-slider.io/)
- [Node.js](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/)
- [Radix UI](https://www.radix-ui.com/)
- [React](https://pt-br.reactjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [React Native](https://reactnative.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 
 
# ⚠️ Antes de iniciar o projeto ⚠️

Primeiramente instale as dependência dentro das pastas server, web e mobile, após isso realize as modificações abaixo.
 
### :file_folder: Pasta server
• Renomeie o arquivo .env.example apenas para .env, descomente a primeira linha de código removendo o caractere #. Por fim, execute o código `npx prisma generate` para restabelecer o link entre o arquivo schema.prisma e env.

### :file_folder: Pasta mobile
• Substitua todos os lugares que estão escrito `localhost` para o ip da sua máquina;

• Renomeie o .env.example para .env, descomente e informe os seus dados, disponível no OAuth2 Discord. Para mais informações [acesse aqui](https://www.youtube.com/watch?v=z4A0YHGb8N0&t=2562s) precisamente no minuto 35:30.

# ▶️ Executando o projeto
```js
// Instala as dependências
npm install

// Excecuta aplicação web e server
npm run dev

// Excecuta aplicação mobile
expo start
```
 
# 📄 Licença

Esse projeto está sob a licença MIT.