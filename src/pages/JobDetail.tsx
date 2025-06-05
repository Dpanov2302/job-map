
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GoogleMap from '@/components/GoogleMap';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, Job } from '@/data/mockJobs';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Wifi, 
  Calendar,
  CheckCircle,
  Star
} from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const foundJob = mockJobs.find(j => j.id === id);
    setJob(foundJob || null);
  }, [id]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Вакансия не найдена</h1>
          <Link to="/jobs">
            <Button>Вернуться к поиску</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/jobs">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Назад к вакансиям</span>
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                      />
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h1>
                        <p className="text-xl text-blue-600 font-semibold">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {job.remote && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          Remote
                        </Badge>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(job.postedDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Описание вакансии
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Требования
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Что мы предлагаем
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <Button 
                    onClick={handleApply}
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Откликнуться
                  </Button>
                  {!isAuthenticated && (
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      Войдите в аккаунт, чтобы откликнуться на вакансию
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Расположение офиса
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <GoogleMap
                    lat={job.coords.lat}
                    lng={job.coords.lng}
                    height="300px"
                    title={job.title}
                    company={job.company}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-gray-900">
                    О компании
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={job.companyLogo} 
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.company}</h4>
                      <p className="text-sm text-gray-500">Технологическая компания</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Одна из ведущих IT-компаний с многолетним опытом разработки 
                    инновационных решений.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
