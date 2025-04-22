# Домашнее задание 5

Тестовое приложния на основе Flask с фразой "Hello from Flask" в кластере Kubernetes, используя инструменты `k3d`, `kubectl` и Ingress.

---

## Пошаговая инструкция по запуску

### 1. Сборка Docker-образа
Соберите Docker-образ приложения с тегом `task5-image:v1`:
```bash
docker build -t task5-image:v1 .
```

### 2. Создание кластера Kubernetes
Создайте кластер Kubernetes с помощью `k3d`:
```bash
k3d cluster create task5-cluster --servers 1 --agents 2 --port '80:80'
```

### 3. Импорт Docker-образа
Импортируйте собранный Docker-образ в кластер:
```bash
k3d image import task5-image:v1 --cluster task5-cluster
```

### 4. Развертывание приложения
Примените манифесты `deployment.yaml` и `service.yaml`:
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### 5. Установка контроллера Ingress NGINX
Установите контроллер Ingress NGINX:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 6. Настройка Ingress
Примените манифест `ingress.yaml` для маршрутизации трафика:
```bash
kubectl apply -f ingress.yaml
```

---

## Проверка работы
После выполнения всех шагов, убедитесь, что приложение доступно по адресу `http://task5.local`. Вы должны увидеть сообщение:
```
Hello from Flask
```