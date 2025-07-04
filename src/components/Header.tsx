import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import RoleSwitch from './RoleSwitch';
import AddVacancyFab from './AddVacancyFab';
import { LogOut, User, MapPin, Plus } from 'lucide-react';
import { motion } from 'framer-motion';


const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <>
        {/* Sticky top header */}
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* ── Left: Logo + nav links (lg+) */}
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2 group">
                  <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JobMap
                </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center space-x-6">
                  <Link
                      to="/"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    Главная
                  </Link>
                  <Link
                      to="/jobs"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    Вакансии
                  </Link>
                </nav>
              </div>

              {/* ── Center (mobile) or pushed slightly right (desktop) : RoleSwitch */}
              {isAuthenticated && <RoleSwitch />}

              {/* ── Right: actions */}
              <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                    <>
                      {/* Add vacancy button only on lg+ here */}
                      {role === 'employer' && (
                          <Link to="/create-job" className="hidden lg:block">
                            <Button
                                size="sm"
                                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="hidden xl:inline">Добавить вакансию</span>
                            </Button>
                          </Link>
                      )}

                      {/* Profile */}
                      <Link to="/profile">
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="hidden sm:inline">{user?.name}</span>
                        </Button>
                      </Link>

                      {/* Logout */}
                      <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Выйти</span>
                      </Button>
                    </>
                ) : (
                    <>
                      <Link to="/login">
                        <Button variant="ghost" size="sm">
                          Войти
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Регистрация
                        </Button>
                      </Link>
                    </>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Floating add vacancy button for mobile employer */}
        <AddVacancyFab />
      </>
  );
};

export default Header;
