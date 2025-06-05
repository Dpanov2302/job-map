
export interface JobFilters {
  tech: string[];
  location: string;
  remote: boolean | null;
  experience: string;
  searchQuery: string;
}

export const filtersService = {
  // Получить фильтры
  getFilters(): JobFilters {
    try {
      const filters = localStorage.getItem('jobFilters');
      return filters ? JSON.parse(filters) : {
        tech: [],
        location: '',
        remote: null,
        experience: '',
        searchQuery: ''
      };
    } catch (error) {
      console.error('Error reading filters:', error);
      return {
        tech: [],
        location: '',
        remote: null,
        experience: '',
        searchQuery: ''
      };
    }
  },

  // Сохранить фильтры
  setFilters(filters: JobFilters): void {
    localStorage.setItem('jobFilters', JSON.stringify(filters));
  },

  // Очистить фильтры
  clearFilters(): void {
    localStorage.removeItem('jobFilters');
  }
};
