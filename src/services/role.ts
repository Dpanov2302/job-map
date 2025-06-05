
export type UserRole = 'candidate' | 'employer';

export const roleService = {
  // Получить роль пользователя
  getRole(): UserRole {
    try {
      const role = localStorage.getItem('role') as UserRole;
      return role || 'candidate';
    } catch (error) {
      console.error('Error reading role:', error);
      return 'candidate';
    }
  },

  // Сохранить роль пользователя
  setRole(role: UserRole): void {
    localStorage.setItem('role', role);
    
    // Обновить роль в данных пользователя
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        user.role = role;
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  }
};
