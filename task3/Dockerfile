# ---------- Стадия 1: Сборка React-приложения ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY simple-site/package.json ./
RUN npm install

# Копируем исходники
COPY simple-site .

# Сборка React-приложения
RUN npm run build

# ---------- Стадия 2: Сервер на Nginx ----------
FROM nginx:stable-alpine AS production

# Копируем кастомный конфиг
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Копируем сборку приложения
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]