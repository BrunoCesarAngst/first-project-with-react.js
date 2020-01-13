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
```
