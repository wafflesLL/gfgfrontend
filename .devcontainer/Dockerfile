FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
    bash \
    git \
    python3 \
    make \
    g++ \
    libc6-compat \
    && npm install -g expo-cli

# Copy only package.json and package-lock.json first
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]