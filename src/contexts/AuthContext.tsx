
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/services/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Загружаем данные авторизации из localStorage при старте
    const authData = authService.getAuthData();
    if (authData) {
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Эмуляция логина - принимаем любой email и пароль
      const userData = authService.setAuthData(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Эмуляция регистрации
      const userData = authService.setAuthData(email, password, name);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
