
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

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
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
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
