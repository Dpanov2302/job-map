
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer';
}

export interface AuthData {
  authToken: string;
  user: User;
}

export const authService = {
  // Получить данные авторизации
  getAuthData(): AuthData | null {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        return {
          authToken: token,
          user: JSON.parse(userData)
        };
      }
      return null;
    } catch (error) {
      console.error('Error reading auth data:', error);
      return null;
    }
  },

  // Сохранить данные авторизации
  setAuthData(email: string, password: string, name?: string): User {
    const user: User = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      role: 'candidate'
    };

    const token = `mock_token_${Date.now()}`;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  },

  // Обновить пользователя
  updateUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Очистить данные авторизации
  clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Проверить авторизацию
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
};
