# Servidor de agentes
- API para cadastro de agentes, desafio backend digitro

## Dependencias
- npm i typescript @types/node -D
- npm i tsx -D
- npm i express -D
- npm i --save-dev @types/express
- npm i cors
- npm i uuid
- npm i validator
- npm i mongoose
- npm install --save-dev supertest
- npm install --save-dev jest
- npm i --save-dev @types/jest
- npm i --save-dev jest @types/jest ts-jest


## Rodando o projeto
- no terminal instale as dependencias rodando
- npm i
- logo após execute o npm run dev
- abra uma outra aba no terminal para rodar o docker com o comando
- docker-compose up -d
- para rodar os testes execute npm test

## Desafio Back-end - Desenvolver um servidor de cadastro de agentes em node.js.
O agente é um atendente de Contact Center, ele possui atribuitos definidos pela API.
Sigas as instruções abaixo para maiores detalhes.
Este servidor deverá:

- Receber requisições https GET, POST, PUT e DELETE.
- Este servidor deve seguir a API.
- Todos os métodos da API deverão ser implementados.
- Os agentes deverão ser inseridos em arquivo no formato json.


### Itens adicionais que o servidor poderá ter

- Validação dos campos da API.
- Controle para que agentes não sejam inseridos em duplicidade.
- Casos de testes utilizando um framework de teste.
- Utilização do mongodb no lugar da persistência dos dados em arquivos.
- Execução da aplicação e mongodb em conteineres (docker).
- Utilização de promises e async/await no lugar de callbacks.
