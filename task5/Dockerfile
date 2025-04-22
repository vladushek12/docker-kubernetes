# # Используем официальный образ Nginx
# FROM nginx:alpine

# # Копируем наш index.html в корневую директорию Nginx
# COPY index.html /usr/share/nginx/html/index.html

# Используем базовый образ Python
FROM python:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код приложения
COPY . .

# Определяем порт, который будет использоваться
EXPOSE 5000

# Запускаем приложение
CMD ["python", "app.py"]