
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
    coords: { lat: 55.7558, lng: 37.6176 },
    companyLogo: '/api/placeholder/60/60',
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
    coords: { lat: 59.9311, lng: 30.3609 },
    companyLogo: '/api/placeholder/60/60',
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
    companyLogo: '/api/placeholder/60/60',
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
    coords: { lat: 55.7539, lng: 37.6208 },
    companyLogo: '/api/placeholder/60/60',
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
    companyLogo: '/api/placeholder/60/60',
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
    coords: { lat: 55.7423, lng: 37.6618 },
    companyLogo: '/api/placeholder/60/60',
    postedDate: '2024-01-10',
    technologies: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Apache Spark']
  }
];
