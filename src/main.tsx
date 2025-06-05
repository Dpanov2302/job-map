
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { settingsService } from '@/services/settings'

// Инициализируем тему при загрузке приложения
settingsService.initTheme();

createRoot(document.getElementById("root")!).render(<App />);
