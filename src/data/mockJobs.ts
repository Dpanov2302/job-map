
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  remote: boolean;
  coords: {
    lat: number;
    lng: number;
  };
  companyLogo: string;
  postedDate: string;
  technologies: string[];
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Яндекс',
    location: 'Москва',
    salary: '180 000 - 300 000 ₽',
    type: 'Полная занятость',
    experience: '3-6 лет',
    description: 'Мы ищем опытного Frontend разработчика для работы над ключевыми продуктами Яндекса. Вы будете работать с современными технологиями и влиять на пользовательский опыт миллионов людей.',
    requirements: [
      'Опыт работы с React/Vue.js от 3 лет',
      'Знание TypeScript',
      'Опыт работы с состоянием приложения (Redux, MobX)',
      'Понимание принципов responsive design',
      'Опыт работы с REST API'
    ],
    benefits: [
      'ДМС для сотрудника и семьи',
      'Гибкий график работы',
      'Возможность удаленной работы',
      'Корпоративное обучение',
      'Спортивная компенсация'
    ],
    remote: true,
    coords: { lat: 55.733974, lng: 37.587093 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNGRkRCMDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTBIMzBWMzBIMTBWMTBaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo8L3N2Zz4K',
    postedDate: '2024-01-15',
    technologies: ['React', 'TypeScript', 'Redux', 'CSS3', 'Webpack']
  },
  {
    id: '2',
    title: 'Backend Developer (Node.js)',
    company: 'VK',
    location: 'Санкт-Петербург',
    salary: '150 000 - 250 000 ₽',
    type: 'Полная занятость',
    experience: '2-5 лет',
    description: 'Присоединяйтесь к команде VK для разработки высоконагруженных сервисов. Работайте над проектами, которыми пользуются десятки миллионов людей ежедневно.',
    requirements: [
      'Опыт разработки на Node.js от 2 лет',
      'Знание PostgreSQL/MongoDB',
      'Понимание микросервисной архитектуры',
      'Опыт работы с Docker',
      'Знание принципов REST/GraphQL'
    ],
    benefits: [
      'Конкурентная зарплата',
      'Офис в центре города',
      'Бесплатные обеды',
      'Тимбилдинги и корпоративы',
      'Возможность карьерного роста'
    ],
    remote: false,
    coords: { lat: 59.933622, lng: 30.312967 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiM0Mzg1RjQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNOCAxNkgyNlYyNEg4VjE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=',
    postedDate: '2024-01-14',
    technologies: ['Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'Redis']
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Ozon',
    location: 'Москва',
    salary: '200 000 - 350 000 ₽',
    type: 'Полная занятость',
    experience: '4-7 лет',
    description: 'Разрабатывайте комплексные решения для одной из крупнейших e-commerce платформ России. Работайте как с frontend, так и с backend частями системы.',
    requirements: [
      'Опыт full-stack разработки от 4 лет',
      'React + Node.js/Python',
      'Опыт работы с микросервисами',
      'Знание SQL и NoSQL баз данных',
      'Опыт работы с облачными платформами'
    ],
    benefits: [
      'Высокая зарплата',
      'Акции компании',
      'Гибридная работа',
      'Образовательный бюджет',
      'Современный офис'
    ],
    remote: true,
    coords: { lat: 55.7887, lng: 37.6178 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMwMDUyRkYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-13',
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL']
  },
  {
    id: '4',
    title: 'Mobile Developer (React Native)',
    company: 'Сбер',
    location: 'Москва',
    salary: '170 000 - 280 000 ₽',
    type: 'Полная занятость',
    experience: '2-4 года',
    description: 'Развивайте мобильные приложения Сбера, которыми пользуются миллионы клиентов. Работайте с современными технологиями в команде профессионалов.',
    requirements: [
      'Опыт разработки на React Native от 2 лет',
      'Знание нативной разработки (iOS/Android)',
      'Опыт работы с Redux/MobX',
      'Понимание принципов UX/UI',
      'Опыт интеграции с API'
    ],
    benefits: [
      'Стабильная компания',
      'Социальный пакет',
      'Возможность обучения',
      'Карьерный рост',
      'Офис класса А'
    ],
    remote: false,
    coords: { lat: 55.748914, lng: 37.535475 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMwMEE1NTEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-12',
    technologies: ['React Native', 'Redux', 'iOS', 'Android', 'JavaScript']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Kaspersky',
    location: 'Москва',
    salary: '160 000 - 300 000 ₽',
    type: 'Полная занятость',
    experience: '3-6 лет',
    description: 'Обеспечивайте надежность и масштабируемость IT-инфраструктуры мирового лидера в области кибербезопасности.',
    requirements: [
      'Опыт работы с Kubernetes/Docker',
      'Знание AWS/Azure/GCP',
      'Scripting (Python/Bash)',
      'CI/CD pipelines',
      'Мониторинг и логирование'
    ],
    benefits: [
      'Международная компания',
      'Работа с передовыми технологиями',
      'Обучение за счет компании',
      'ДМС',
      'Гибкий график'
    ],
    remote: true,
    coords: { lat: 55.7663, lng: 37.6779 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNGRjQ1MDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-11',
    technologies: ['Kubernetes', 'Docker', 'AWS', 'Python', 'Terraform']
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'МТС',
    location: 'Москва',
    salary: '180 000 - 320 000 ₽',
    type: 'Полная занятость',
    experience: '2-5 лет',
    description: 'Анализируйте большие данные и создавайте ML-модели для улучшения пользовательского опыта клиентов МТС.',
    requirements: [
      'Опыт работы с Python/R',
      'Знание ML библиотек (sklearn, pandas)',
      'Опыт работы с SQL',
      'Понимание статистики',
      'Опыт работы с BigData'
    ],
    benefits: [
      'Интересные задачи',
      'Современные инструменты',
      'Команда экспертов',
      'Корпоративные льготы',
      'Профессиональное развитие'
    ],
    remote: true,
    coords: { lat: 55.691734, lng: 37.660557 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNFNTAwNDUiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-10',
    technologies: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Apache Spark']
  },
  {
    id: '7',
    title: 'Frontend Developer',
    company: 'Авито',
    location: 'Москва',
    salary: '160 000 - 280 000 ₽',
    type: 'Полная занятость',
    experience: '2-4 года',
    description: 'Разрабатывайте пользовательские интерфейсы для крупнейшей площадки объявлений в России. Работайте с миллионами пользователей каждый день.',
    requirements: [
      'Опыт работы с React от 2 лет',
      'Знание JavaScript ES6+',
      'Опыт работы с TypeScript',
      'Понимание принципов веб-доступности',
      'Опыт оптимизации производительности'
    ],
    benefits: [
      'Гибкий график',
      'ДМС премиум',
      'Корпоративное обучение',
      'Современный офис',
      'Удаленная работа'
    ],
    remote: true,
    coords: { lat: 55.7522, lng: 37.6156 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMwMEJCOTkiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-09',
    technologies: ['React', 'TypeScript', 'JavaScript', 'CSS3', 'Webpack']
  },
  {
    id: '8',
    title: 'Backend Engineer',
    company: 'WB Tech',
    location: 'Москва',
    salary: '200 000 - 350 000 ₽',
    type: 'Полная занятость',
    experience: '3-6 лет',
    description: 'Создавайте высоконагруженные системы для одного из крупнейших маркетплейсов России. Работайте с петабайтами данных и миллионами транзакций.',
    requirements: [
      'Опыт разработки на Go/Java от 3 лет',
      'Знание микросервисной архитектуры',
      'Опыт работы с Kubernetes',
      'Знание принципов высоконагруженных систем',
      'Опыт работы с очередями сообщений'
    ],
    benefits: [
      'Высокая зарплата',
      'Акции компании',
      'Медицинская страховка',
      'Спортивные программы',
      'Гибкий график'
    ],
    remote: true,
    coords: { lat: 55.7558, lng: 37.6176 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiM2QjE2RDEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-08',
    technologies: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis', 'RabbitMQ']
  },
  {
    id: '9',
    title: 'Android Developer',
    company: 'Т-Банк',
    location: 'Москва',
    salary: '190 000 - 320 000 ₽',
    type: 'Полная занятость',
    experience: '3-5 лет',
    description: 'Разрабатывайте мобильное приложение одного из самых инновационных банков России. Создавайте продукты, которыми пользуются миллионы клиентов.',
    requirements: [
      'Опыт разработки Android приложений от 3 лет',
      'Знание Kotlin/Java',
      'Опыт работы с архитектурными паттернами',
      'Понимание принципов Material Design',
      'Опыт работы с финтех проектами'
    ],
    benefits: [
      'Конкурентная зарплата',
      'Банковские продукты со льготами',
      'Обучение и развитие',
      'Современные технологии',
      'Комфортный офис'
    ],
    remote: false,
    coords: { lat: 55.774102, lng: 37.576834 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNGRkRCMDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo8L3N2Zz4K',
    postedDate: '2024-01-07',
    technologies: ['Kotlin', 'Android SDK', 'Material Design', 'RxJava', 'Dagger']
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'Rambler Group',
    location: 'Москва',
    salary: '120 000 - 200 000 ₽',
    type: 'Полная занятость',
    experience: '1-3 года',
    description: 'Обеспечивайте качество продуктов Rambler Group. Работайте с автоматизацией тестирования и внедрением современных практик QA.',
    requirements: [
      'Опыт тестирования веб-приложений',
      'Знание основ автоматизации',
      'Понимание принципов CI/CD',
      'Опыт работы с API тестированием',
      'Знание SQL'
    ],
    benefits: [
      'Стабильная компания',
      'Обучение новым технологиям',
      'Дружная команда',
      'Социальный пакет',
      'Гибкий график'
    ],
    remote: true,
    coords: { lat: 55.7522, lng: 37.6156 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNGRjZBMDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-06',
    technologies: ['Selenium', 'API Testing', 'SQL', 'Jenkins', 'TestNG']
  },
  {
    id: '11',
    title: 'Product Manager',
    company: '2ГИС',
    location: 'Новосибирск',
    salary: '150 000 - 280 000 ₽',
    type: 'Полная занятость',
    experience: '2-5 лет',
    description: 'Управляйте развитием продуктов 2ГИС - ведущего картографического сервиса. Работайте над улучшением пользовательского опыта миллионов людей.',
    requirements: [
      'Опыт продуктового менеджмента от 2 лет',
      'Понимание принципов UX/UI',
      'Аналитическое мышление',
      'Опыт работы с данными',
      'Знание методологий разработки'
    ],
    benefits: [
      'Влияние на продукт',
      'Команда профессионалов',
      'Обучение и развитие',
      'Комфортный офис',
      'Возможность удаленной работы'
    ],
    remote: true,
    coords: { lat: 55.0084, lng: 82.9357 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiMwMDk2ODgiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-05',
    technologies: ['Product Management', 'Analytics', 'A/B Testing', 'SQL', 'Figma']
  },
  {
    id: '12',
    title: 'DevOps Engineer',
    company: 'Ростелеком',
    location: 'Санкт-Петербург',
    salary: '140 000 - 250 000 ₽',
    type: 'Полная занятость',
    experience: '2-4 года',
    description: 'Обеспечивайте стабильную работу IT-инфраструктуры крупнейшего телекоммуникационного оператора России.',
    requirements: [
      'Опыт работы с Linux/Unix системами',
      'Знание Docker/Kubernetes',
      'Опыт работы с облачными платформами',
      'Scripting (Bash/Python)',
      'Понимание принципов CI/CD'
    ],
    benefits: [
      'Стабильная работа',
      'Социальный пакет',
      'Обучение и сертификация',
      'Карьерный рост',
      'Льготы сотрудникам'
    ],
    remote: false,
    coords: { lat: 59.9311, lng: 30.3609 },
    companyLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNEQzI2MjYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTAgMTJIMzBWMjhIMTBWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+',
    postedDate: '2024-01-04',
    technologies: ['Linux', 'Docker', 'Kubernetes', 'Python', 'AWS']
  }
];
