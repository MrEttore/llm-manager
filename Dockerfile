FROM node:23-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
