# Utilisez une image PHP 8.1 Alpine pour Symfony
FROM php:8.1-fpm-alpine

# Installez les dépendances nécessaires (vous pouvez ajouter d'autres extensions selon les besoins)
RUN apk --no-cache add icu-dev git zip && \
    docker-php-ext-install intl pdo pdo_mysql

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de l'application Symfony dans le conteneur
COPY . .

# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Téléchargez Symfony CLI binaire précompilé directement depuis le site officiel
RUN wget https://github.com/symfony/cli/releases/latest/download/symfony_linux_amd64 -O /usr/local/bin/symfony && \
    chmod +x /usr/local/bin/symfony

# Exposez le port 8000 pour que le service soit accessible depuis l'extérieur (Symfony server écoute sur ce port)
EXPOSE 8000

# Commande pour démarrer le serveur Symfony
CMD ["symfony", "server:start", "--no-tls"]
