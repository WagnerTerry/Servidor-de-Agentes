# Use a imagem oficial do Node.js
FROM node:20

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos
COPY . .

# Exponha a porta que a aplicação estará ouvindo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/app.ts"]