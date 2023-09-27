FROM node:18

WORKDIR /app/client

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]