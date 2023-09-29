# Utilisez une image Node.js 18 Alpine pour construire votre application React
FROM node:18-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et yarn.lock dans le conteneur
COPY package.json yarn.lock ./

RUN apk --no-cache add yarn

# Installez les dépendances avec Yarn
RUN yarn install

# Installez Vite globalement
RUN yarn global add create-vite

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port 3000 pour que le service soit accessible depuis l'extérieur
EXPOSE 3000

# Commande pour démarrer l'application React
CMD ["yarn", "run", "dev"]

#CMD ["yarn", "build"]