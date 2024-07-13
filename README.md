# Documentação do Leilão Farm Simulator

## Índice

1. [Introdução](#introdução)
2. [Como Criar um Novo Leilão](#como-criar-um-novo-leilão)
3. [Dependências Técnicas](#dependências-técnicas)
4. [Scripts Disponíveis](#scripts-disponíveis)
5. [Descrição Técnica dos Pacotes](#descrição-técnica-dos-pacotes)
6. [Aprendendo Mais](#aprendendo-mais)

---

## Introdução

Este projeto é um aplicativo de leilão para o Farm Simulator, criado com React no frontend e Node.js com Express e Mongoose no backend. A aplicação permite aos usuários criar leilões, fazer lances e acompanhar o status dos leilões em tempo real.

---

## Como Criar um Novo Leilão

1. **Navegar até a página de criação de leilão**:
   - No canto superior direito, clique na aba **"Criar Leilão"**.

2. **Inserir os dados do item**:
   - Preencha os campos necessários com as informações do item que será leiloado, incluindo nome, descrição, imagem, lance inicial, e o tempo do leilão.

3. **Salvar o novo leilão**:
   - Clique no botão de **"Salvar"** para criar o leilão.

---

## Dependências Técnicas

Aqui estão as principais dependências utilizadas neste projeto e uma breve descrição de cada uma:

```json
{
  
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "cors": "^2.8.5",
    "mongoose": "^8.5.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```
## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

- **npm start**: Executa o aplicativo no modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador. A página será recarregada quando você fizer alterações.

- **npm test**: Inicia o executor de testes no modo interativo. Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

- **npm run build**: Compila o aplicativo para produção na pasta `build`. Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho. Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

- **npm run eject**: **Nota: esta é uma operação sem retorno**. Uma vez que você `eject`, não pode voltar! Se você não estiver satisfeito com a ferramenta de construção e as escolhas de configuração, pode ejetar a qualquer momento. Este comando removerá a única dependência de compilação do seu projeto.

## Descrição Técnica dos Pacotes

- **@testing-library/jest-dom**: Fornece utilitários personalizados para testar elementos DOM com Jest.
- **@testing-library/react**: Conjunto de utilitários para testar componentes React.
- **@testing-library/user-event**: Permite simular eventos do usuário em testes.
- **axios**: Cliente HTTP baseado em Promises para o navegador e node.js. Utilizado para fazer requisições HTTP para a API.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing) em aplicativos Express.
- **mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js. Utilizada para definir esquemas e interagir com o banco de dados MongoDB.
- **react**: Biblioteca JavaScript para construir interfaces de usuário.
- **react-dom**: Proporciona métodos específicos do DOM que podem ser usados no nível superior do seu aplicativo como uma entrada de div.
- **react-router-dom**: Gerenciador de rotas para aplicações React, permitindo a navegação entre diferentes páginas e componentes.
- **react-scripts**: Conjunto de scripts e configuração usada pelo Create React App.
- **web-vitals**: Biblioteca para medir as métricas vitais da web.

## Aprendendo Mais

Você pode aprender mais na documentação do [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a documentação do [React](https://reactjs.org/).

### Divisão de Código

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/code-splitting).

### Análise do Tamanho do Pacote

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).

### Criando um Progressive Web App

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

### Configuração Avançada

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/advanced-configuration).

### Implantação

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/deployment).

### npm run build falha ao minificar

Esta seção foi movida para [aqui](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
