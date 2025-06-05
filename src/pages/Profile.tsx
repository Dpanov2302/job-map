
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Briefcase, Clock, Building, Eye } from 'lucide-react';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  coverLetter: string;
  phone: string;
  expectedSalary: string;
  resumeFileName: string;
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem('job_applications') || '[]');
    setApplications(savedApplications);
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'На рассмотрении';
      case 'reviewed':
        return 'Рассмотрено';
      case 'accepted':
        return 'Принято';
      case 'rejected':
        return 'Отклонено';
      default:
        return status;
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Профиль
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Имя</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Статус</label>
                  <Badge variant="secondary" className="block w-fit">Соискатель</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Applications */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Мои отклики ({applications.length})
                    </h2>
                    <Link to="/jobs">
                      <Button size="sm">Найти вакансии</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Пока нет откликов
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Найдите интересные вакансии и отправьте свой первый отклик
                      </p>
                      <Link to="/jobs">
                        <Button>Найти вакансии</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application, index) => (
                        <motion.div
                          key={application.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {application.jobTitle}
                              </h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Building className="w-4 h-4 mr-1" />
                                {application.company}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="w-4 h-4 mr-1" />
                                {new Date(application.appliedAt).toLocaleDateString('ru-RU')}
                              </div>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusText(application.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              Резюме: {application.resumeFileName}
                            </div>
                            <Link to={`/jobs/${application.jobId}`}>
                              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>Посмотреть вакансию</span>
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
