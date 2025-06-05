
export type Theme = 'light' | 'dark';

export const settingsService = {
  // Получить тему
  getTheme(): Theme {
    try {
      const theme = localStorage.getItem('theme') as Theme;
      return theme || 'light';
    } catch (error) {
      console.error('Error reading theme:', error);
      return 'light';
    }
  },

  // Установить тему
  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    
    // Применяем тему к HTML элементу
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Переключить тему
  toggleTheme(): Theme {
    const currentTheme = this.getTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  },

  // Инициализировать тему при загрузке
  initTheme(): void {
    const theme = this.getTheme();
    this.setTheme(theme);
  }
};
