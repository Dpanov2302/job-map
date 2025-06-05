
export const favoritesService = {
  // Получить избранные вакансии
  getFavorites(): string[] {
    try {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites:', error);
      return [];
    }
  },

  // Переключить избранное
  toggleFavorite(jobId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(jobId);
    
    if (index === -1) {
      favorites.push(jobId);
    } else {
      favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return index === -1; // возвращаем true если добавили, false если удалили
  },

  // Проверить, в избранном ли вакансия
  isFavorite(jobId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(jobId);
  }
};
