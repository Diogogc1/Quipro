# Etapa 1: Construção
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Garantir permissões adequadas para os arquivos
RUN chmod -R 755 /app
RUN npm run build

# Etapa 2: Servidor
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
