
# JobMap Portal

Современный портал поиска IT-вакансий, построенный на React + TypeScript + Vite с интерактивной картой вакансий.

## Особенности

- **Поиск и фильтрация вакансий** - по технологиям, локации, опыту работы
- **Интерактивная карта** - показывает расположение офисов IT-компаний
- **Детальные страницы вакансий** - с полным описанием и картой офиса
- **Система откликов** - отправка резюме и сопроводительных писем
- **Личный кабинет** - история откликов и управление профилем
- **Адаптивный дизайн** - оптимизировано для всех устройств
- **Современные анимации** - плавные переходы и эффекты

## Технологии

- **Frontend**: React 18, TypeScript, Vite
- **Стилизация**: Tailwind CSS, shadcn/ui
- **Карты**: Yandex Maps API v3.0
- **Анимации**: Framer Motion
- **Роутинг**: React Router
- **Формы**: React Hook Form
- **Состояние**: React Context API + localStorage

## Установка и запуск

Для работы требуется Node.js версии 18 или новее, менеджер пакетов npm и среда
выполнения bun (используется для тестов).

```bash
# Клонирование репозитория
git clone git@github.com:Dpanov2302/job-map.git
cd job-map

# Установка зависимостей
npm install
# если требуется запускать тесты, предварительно установите `bun` и выполните
# bun install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Эмуляция бэкенда через localStorage

Приложение использует localStorage для эмуляции серверной части без необходимости в реальном бэкенде.

### Структура данных в localStorage

#### Авторизация
- **`authToken`** - строка токена авторизации (мок)
- **`user`** - JSON объект пользователя:
  ```json
  {
    "id": "string",
    "name": "string", 
    "email": "string",
    "role": "candidate" | "employer"
  }
  ```

#### Роли и настройки
- **`role`** - текущая роль пользователя (`"candidate"` | `"employer"`)
- **`theme`** - тема интерфейса (`"light"` | `"dark"`)

#### Данные соискателей
- **`replies`** - массив откликов на вакансии:
  ```json
  [
    {
      "id": "string",
      "jobId": "string", 
      "jobTitle": "string",
      "company": "string",
      "date": "ISO string",
      "resumeUrl": "string",
      "resumeFileName": "string", 
      "coverLetter": "string",
      "phone": "string",
      "expectedSalary": "string",
      "status": "pending" | "reviewed" | "rejected" | "accepted"
    }
  ]
  ```

#### Данные работодателей
- **`myJobs`** - массив собственных вакансий работодателя (структура как в `mockJobs`)

#### Общие данные
- **`favorites`** - массив ID избранных вакансий: `["1", "2", "3"]`
- **`jobFilters`** - объект с настройками фильтров:
  ```json
  {
    "tech": ["React", "Node.js"],
    "location": "Москва", 
    "remote": true,
    "experience": "3-6 лет",
    "searchQuery": "frontend"
  }
  ```
- **`jobsCache`** - кэш всех вакансий (изначально загружается из `mockJobs`)

### Сервисы для работы с localStorage

Все операции с localStorage инкапсулированы в сервисах в папке `src/services/`:

#### `auth.ts` - Авторизация
- `getAuthData()` - получить данные авторизации
- `setAuthData(email, password, name?)` - сохранить данные авторизации
- `updateUser(user)` - обновить данные пользователя
- `clearAuthData()` - очистить данные авторизации
- `isAuthenticated()` - проверить статус авторизации

#### `role.ts` - Управление ролями
- `getRole()` - получить текущую роль
- `setRole(role)` - установить роль

#### `replies.ts` - Отклики соискателей
- `getReplies()` - получить все отклики
- `addReply(jobId, jobTitle, company, ...)` - добавить отклик
- `updateReplyStatus(replyId, status)` - обновить статус отклика
- `hasRepliedToJob(jobId)` - проверить наличие отклика на вакансию

#### `jobs.ts` - Управление вакансиями
- `getJobs()` - получить все вакансии (из кэша)
- `cacheJobs(jobs)` - сохранить вакансии в кэш
- `getMyJobs()` - получить собственные вакансии (для работодателей)
- `addJob(job)` - добавить вакансию
- `updateJob(jobId, updates)` - обновить вакансию
- `removeJob(jobId)` - удалить вакансию
- `getJobById(jobId)` - найти вакансию по ID

#### `favorites.ts` - Избранные вакансии
- `getFavorites()` - получить список избранного
- `toggleFavorite(jobId)` - переключить статус избранного
- `isFavorite(jobId)` - проверить, в избранном ли вакансия

#### `filters.ts` - Фильтры поиска
- `getFilters()` - получить настройки фильтров
- `setFilters(filters)` - сохранить настройки фильтров
- `clearFilters()` - очистить фильтры

#### `settings.ts` - Настройки UI
- `getTheme()` - получить текущую тему
- `setTheme(theme)` - установить тему
- `toggleTheme()` - переключить тему
- `initTheme()` - инициализировать тему при старте

### Инициализация данных

При первом запуске приложения:
1. Загружаются моковые вакансии из `mockJobs.ts` и сохраняются в `jobsCache`
2. Инициализируется тема из localStorage или устанавливается `'light'` по умолчанию
3. Загружаются данные авторизации, роль пользователя и другие настройки

### Примеры использования

```typescript
// Авторизация
import { authService } from '@/services/auth';
const user = authService.getAuthData()?.user;

// Отклики
import { repliesService } from '@/services/replies';
repliesService.addReply('1', 'Frontend Developer', 'Яндекс', 'resume.pdf', 'Хочу работать', '+7123456789', '200000');

// Избранное
import { favoritesService } from '@/services/favorites';
const isLiked = favoritesService.toggleFavorite('1');

// Фильтры
import { filtersService } from '@/services/filters';
filtersService.setFilters({ tech: ['React'], location: 'Москва', remote: true, experience: '', searchQuery: '' });
```

## Основные страницы

### Главная страница (`/`)
- Герой-секция с поиском
- Фильтры по технологиям, опыту, локации
- Статистика портала
- Призыв к действию

### Список вакансий (`/jobs`)
- Карточки вакансий с основной информацией
- Режим списка и карты
- Расширенные фильтры
- Поиск по ключевым словам

### Детальная страница вакансии (`/jobs/:id`)
- Полное описание вакансии
- Требования и преимущества
- Карта с офисом компании
- Кнопка "Откликнуться"

### Форма отклика (`/jobs/:id/apply`)
- Загрузка резюме
- Сопроводительное письмо
- Контактная информация
- Ожидаемая зарплата

### Личный кабинет (`/profile`)
- Информация о пользователе
- История отправленных откликов (для соискателей)
- Управление собственными вакансиями (для работодателей)
- Статус рассмотрения
### Создание вакансии (`/create-job`)
- Форма размещения новой вакансии
- Доступно работодателям
### Авторизация (`/login`, `/register`)
- Регистрация и вход
- Сохранение сессии в localStorage
### Страница 404 (`*`)
- Уведомление о неверном маршруте
- Ссылка для возврата на главную

## Интерактивная карта

- Использует Yandex Maps API v3.0
- Показывает метки офисов компаний
- Клик по метке отображает информацию о вакансии
- Автоматический zoom для показа всех меток
- Адаптивный дизайн для мобильных устройств

## Дизайн

- **Цветовая схема**: градиенты от синего к фиолетовому
- **Типографика**: современные шрифты с хорошей читаемостью
- **Компоненты**: используется библиотека shadcn/ui
- **Анимации**: плавные переходы с Framer Motion
- **Адаптивность**: Mobile-first подход
- **Темная тема**: поддержка переключения между светлой и темной темами

## Адаптивность

- **Mobile** (320px+): одноколоночная компоновка
- **Tablet** (768px+): двухколоночная компоновка
- **Desktop** (1024px+): трехколоночная компоновка
- **Large screens** (1440px+): оптимизированная компоновка

## Структура проекта

```
src/
├── components/               # Переиспользуемые компоненты
│   ├── Header.tsx            # Навигация
│   ├── SearchFilters.tsx     # Поиск и фильтры
│   ├── JobCard.tsx           # Карточка вакансии
│   ├── JobMap.tsx            # Интерактивная карта
│   ├── YandexMap.tsx         # Базовый компонент карты
│   ├── YandexJobMap.tsx      # Карта с вакансиями
│   ├── RoleSwitch.tsx        # Переключатель ролей
│   ├── CreateJob/            # Компоненты формы создания вакансии
│   └── ui/                   # Компоненты библиотеки shadcn/ui
├── pages/                    # Страницы приложения
│   ├── Index.tsx
│   ├── Home.tsx
│   ├── Jobs.tsx
│   ├── JobDetail.tsx
│   ├── ApplyJob.tsx
│   ├── CreateJob.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── NotFound.tsx
├── contexts/                 # React Context
│   ├── AuthContext.tsx       # Контекст авторизации
│   └── RoleContext.tsx       # Контекст ролей
├── services/                 # Сервисы для работы с localStorage
│   ├── auth.ts
│   ├── role.ts
│   ├── replies.ts
│   ├── jobs.ts
│   ├── favorites.ts
│   ├── filters.ts
│   └── settings.ts
├── hooks/                    # Кастомные хуки
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── data/                     # Моковые данные
│   └── mockJobs.ts
├── lib/                      # Утилиты
│   └── utils.ts
└── schemas/                  # Схемы валидации
    └── jobFormSchema.ts
```

