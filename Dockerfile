# React Native (Expo) dev container
FROM node:20-bullseye

# Reliable file watching inside containers
ENV CHOKIDAR_USEPOLLING=1
ENV WATCHPACK_POLLING=true
ENV CI=false

# (Optional) If you might use yarn/pnpm later
# RUN corepack enable

WORKDIR /app

# Install deps first for better layer caching
COPY package*.json ./
RUN npm ci || npm install

# Bring in the rest of the app
COPY . .

# Expo / Metro ports
EXPOSE 8081 19000 19001 19002 19006

# Run the Expo dev server
CMD ["npm", "run", "start"]
