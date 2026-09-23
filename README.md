# API-GREEN-TEST-MAX

Клиент для отправки и получения текстовых сообщений в мессенджере MAX через [GREEN-API](https://green-api.com/max). Тестовое задание на позицию "Фронтенд разработчик React".

Демо: https://api-green-test-bqrma05t7-kachalochka99-4047s-projects.vercel.app/

## Стек

React + TypeScript, Vite, Redux Toolkit + RTK Query, SCSS Modules, архитектура — Feature-Sliced Design.

## Как запустить локально

Понадобится Node.js 18+ и уже настроенный инстанс GREEN-API для MAX (`idInstance` и `apiTokenInstance` — из [личного кабинета GREEN-API](https://console.green-api.com/); инстанс должен быть авторизован по QR-коду в приложении MAX, а в настройках инстанса включено "Получать уведомления о входящих сообщениях и файлах" — иначе получение сообщений работать не будет).

```bash
git clone https://github.com/ILYA9090/API-GREEN-TEST-MAX.git
cd API-GREEN-TEST-MAX
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`. При первом запуске нужно ввести `idInstance` и `apiTokenInstance` от своего инстанса — они сохранятся в `localStorage` браузера, повторно вводить не придётся.

## Сборка

```bash
npm run build
```

Собранные файлы появятся в `dist/`.

## Известные ограничения

- Адаптация под мобильные экраны не реализована - вёрстка рассчитана на десктоп.

## Как это работает

1. Пользователь вводит номер телефона получателя - приложение проверяет наличие аккаунта MAX методом `CheckAccount` и получает `chatId`.
2. Сообщения отправляются методом `SendMessage`.
3. Входящие сообщения вычитываются фоновым циклом `ReceiveNotification`/`DeleteNotification`.

Учётные данные GREEN-API живут только в `localStorage`.
