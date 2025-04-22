# Используем официальный образ Python
FROM python:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY ./requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем приложение
COPY . .

# Запускаем Flask
CMD ["python", "app.py"]