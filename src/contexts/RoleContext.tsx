
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'candidate' | 'employer';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('candidate');

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role') as UserRole;
    if (savedRole && (savedRole === 'candidate' || savedRole === 'employer')) {
      setRole(savedRole);
    }
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('user_role', newRole);
  };

  const toggleRole = () => {
    const newRole = role === 'candidate' ? 'employer' : 'candidate';
    handleSetRole(newRole);
  };

  return (
    <RoleContext.Provider value={{
      role,
      setRole: handleSetRole,
      toggleRole,
    }}>
      {children}
    </RoleContext.Provider>
  );
};
