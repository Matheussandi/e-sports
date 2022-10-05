# <p align="center">eSports</p>

<p align="justify">Aplicação para você encontrar seu duo, selecionando um jogo específico e escolhendo o jogador ideal para se divertir, ou então você tem a possibilidade de criar um anúncio e esperar que alguém te chame pelo discord.</p>

<p align="center">
  <video src="https://user-images.githubusercontent.com/29473781/193426386-400433fe-a110-4f21-b149-01581362f01e.mp4"/>
  <br>
  Construído através do deste layout.
</p>

# :pushpin: Recursos

- [x] Visualização dos jogos;

- [x] Controle deslizando nas imagens;
 
- [x] Verificação dos anúncios de um jogo específico;
 
- [x] Informações do anunciante;

- [x] Publicação de um novo anúncio;

- [x] Validação dos dados;

- [x] Responsividade.
 
# 👨‍💻 Tecnologias

- [React](https://pt-br.reactjs.org/)

- [Typescript](https://www.typescriptlang.org/)

- [Vite](https://vitejs.dev/)

- [Tailwind CSS](https://tailwindcss.com/)

- [Radix UI](https://www.radix-ui.com/)

- [Keen-slider](https://keen-slider.io/)

- [Node.js](https://nodejs.org/en/)

- [Express](https://expressjs.com/pt-br/)

- [Prisma](https://www.prisma.io/)

- [Axios](https://axios-http.com/docs/intro)

- [React Native](https://reactnative.dev/)
 
- [Expo](https://expo.dev/)
 
# ⚠️ Antes de iniciar o projeto ⚠️

Primeiramente instale as dependência dentro das pastas server, web e mobile, após isso realize as modificações abaixo.
 
### :file_folder: Pasta server
Renomeie o arquivo .env.example apenas para .env, descomente a primeira linha de código removendo o caractere #. Por fim, execute o código `npx prisma generate` para restabelecer o link entre o arquivo schema.prisma e env.

### :file_folder: Pasta mobile
Substitua todos os lugares que estão escrito `localhost` para o ip da sua máquina.

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