# First project with React.json
A project that shows a user's github repositories

## Criando projeto do zero
```zsh
comp:~$ yarn create-app first-project-with-react
comp:~$ cd first-project-with-react
comp:~/first-project-with-react$ git init
comp:~/first-project-with-react$ git remote add origin git@github.com:"perfil"/first-project-with-react.js.git
comp:~/first-project-with-react$ git push -u origin master
```
No arquivo package.json apagamos a parte do eslintConfig, para dar uma personalizada.

No arquivo index.html da pasta public, apagamos os comentários, o link de manifest e assim deletar o arquivo manifest.json.

Na pasta src, apagamos os arquivos App.css, App.test.js, index.css,
logo.svg, serviceWorker.js e setupTests.js. No arquivos index.js removemos a parte do serviceWorker, assim como a sua importação e a importação do index.css. No App.js removemos a importação da logo e do App.css e substituímos o header por um h1

## ESLint, Prettier & EditorConfig
Com o [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for VS Code instalado damos um Generation .editorconfig e editamos nesse arquivo as seguintes linhas:

 end_of_line = lf,

 trim_trailing_whitespace = true,

 insert_final_newline = true

 Vamos configurar o ESLint
```bash
comp:~/first-project-with-react$ yarn add eslint -D
comp:~/first-project-with-react$ yarn eslint --init
# E escolhemos
❯ To check syntax, find problems, and enforce code style
❯ JavaScript modules (import/export)
❯ React
? Does your project use TypeScript? (y/N) N
❯◉ Browser
❯ Use a popular style guide
❯ Airbnb: https://github.com/airbnb/javascript
❯ JavaScript
? Would you like to install them now with npm? (Y/n) Y
# Removemos o arquivo package-lock.json e rodamos yarn na raiz do projeto
comp:~/first-project-with-react$ yarn
# Damos continuação configurando o Prettier
comp:~/first-project-with-react$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
#  Vamos para o arquivo .eslintrc.js e criamos o arquivo .prettierrc
```
```js
// ~/first-project-with-react.js/.eslintrc.js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // 'plugin:react/recommended',
    'airbnb',
    // estendendo as configurações do
    'prettier',
    // e prettier para react
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // Para informar que estamos usando as últimas configurações do babel
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    // incluindo o
    'prettier',
  ],
  rules: {
    // mostrar todos os erros
    'prettier/prettier': 'error',
    // para continuar a usar a extensão .js
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] },
    ],
    // para poder usar export sem default
    'import/prefer-default-export': 'off',
  },
};
```

```json
// ~/first-project-with-react.js/.prettierrc.json
{
  // aspas simples
  "singleQuote": true,
  // virgula à direita
  "trailingComma": "es5"
}
```

## Padronizando mensagens de commit do Git
Usando [commitlint](https://github.com/conventional-changelog/commitlint), [husky](https://github.com/typicode/husky) e o [commitizen](https://github.com/commitizen/cz-cli)
```bash
comp:~/first-project-with-react$ yarn add @commitlint/config-conventional @commitlint/cli -D
comp:~/first-project-with-react$ echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# Para informar ao commitlint que ele deve rodar depois do git commit colocando uma commit message dentro dele
comp:~/first-project-with-react$ yarn add husky -D
```
No package.json colamos isso
```json
},
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      // usando o poder do husky quando for digitado git commit ele executa o
      //commitizen
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true"
    }
  },
  "devDependencies": {
```

```bash
comp:~/first-project-with-react$ yarn add commitizen -D
comp:~/first-project-with-react$ yarn commitizen init cz-conventional-changelog --yarn --dev --exact
# Não deu certo então
comp:~/first-project-with-react$ npm install commitizen -g
comp:~/first-project-with-react$ npm install commitizen --save-dev
# Apaguei o arquivo package-lock.json e rodei
comp:~/first-project-with-react$ yarn
comp:~/first-project-with-react$ git add . && git commit
? Select the type of change that you are committing:
❯ feat:        A new feature
  fix:         A bug fix
  improvement: An improvement to a current feature
  docs:        Documentation only changes
  style:       Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor:    A code change that neither fixes a bug nor adds a feature
  perf:        A code change that improves performance
  test:        Adding missing tests or correcting existing tests
  build:       Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  ci:          Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  chore:       Other changes that don not modify src or test files
(Move up and down to reveal more choices)

? Select the type of change that you are committing: feat:        A new feature
# O scope é um detalhamento para projetos grandes para mostrar onde há mudanças
? What is the scope of this change (e.g. component or file name): (press enter to skip) atualizando
# A mensagem o assunto do commit em si
? Write a short, imperative tense description of the change (max 53 chars):
 (39) feat: creating the project from scratch
# Para se desejar colocar mais informações possibilitando quebra de linha \n
? Provide a longer description of the change: (press enter to skip)
 setting eslint, prettier & editorconfig and standardizing Git commit
# Aqui está perguntando se tem algo que funcionáva e agora não funciona mais
? Are there any breaking changes? No
# Aqui está perguntando se isso afeta alguma issue que está aberta colocando essa informação as issue são fechadas automaticamente
? Does this change affect any open issues? No
```
## Roteamento no React

Navegando entre páginas sem recarregar, pois, estamos construindo um SPA(Um SPA é uma aplicação web que roda em uma única página, se assemelhando a um aplicativo desktop ou um mobile, são leigamento chamadas de “páginas ajax”, um bom exemplo que gosto de usar é o Gmail do Google, ele é um SPA, a navegação na aplicação rola toda em uma única página e todo o conteúdo é carregado de uma vez ou obtido dinâmicamente (ou seja, via requisições Ajax).)
```bash
# para fazer o roteamento de páginas de nossa aplicação
comp:~/first-project-with-react$ yarn add react-router-dom
comp:~/first-project-with-react$ touch src/routes.js
comp:~/first-project-with-react$ mkdir src/pages
comp:~/first-project-with-react$ mkdir src/pages/Main
comp:~/first-project-with-react$ touch src/pages/Main/index.js
comp:~/first-project-with-react$ mkdir src/pages/Repository
comp:~/first-project-with-react$ touch src/pages/Repository/index.js
# configuramos as nossas paginas
# configuramos o arquivo routes para receber as nossas paginas
```
## Styled Components
```bash
comp:~/first-project-with-react$ yarn add styled-components
# Install
# Inside VSCode, press Ctrl+P, and enter:
# ext install vscode-styled-components
comp:~/first-project-with-react$ touch src/pages/Main/styles.js
```
## Estilos globais
```bash
comp:~/first-project-with-react$ mkdir -p src/styles/ && touch src/styles/global.js
# configuramos e importamos esse arquivo para o arquivo App.js, usando fragment para colocar junto do outro componente
```
## Estilizando página Main
Começamos a configurar a página Main
```bash
comp:~/first-project-with-react$ yarn add react-icons
# e configuramos os arquivos index.js e index.js do estilo da página Main
```
