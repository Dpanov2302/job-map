
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs } from '@/data/mockJobs';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    phone: '',
    expectedSalary: '',
  });

  const job = mockJobs.find(j => j.id === id);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Размер файла не должен превышать 5MB');
        return;
      }
      setResumeFile(file);
      toast.success('Резюме загружено успешно');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error('Пожалуйста, загрузите резюме');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - в реальном приложении здесь был бы запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save application to localStorage (mock)
      const applications = JSON.parse(localStorage.getItem('job_applications') || '[]');
      const newApplication = {
        id: Date.now().toString(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedAt: new Date().toISOString(),
        status: 'pending',
        coverLetter: formData.coverLetter,
        phone: formData.phone,
        expectedSalary: formData.expectedSalary,
        resumeFileName: resumeFile.name,
      };
      
      applications.push(newApplication);
      localStorage.setItem('job_applications', JSON.stringify(applications));

      setIsSubmitted(true);
      toast.success('Отклик успешно отправлен!');
    } catch (error) {
      toast.error('Произошла ошибка при отправке отклика');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Отклик отправлен!
                </h1>
                <p className="text-gray-600 mb-6">
                  Ваш отклик на вакансию "{job.title}" в компании {job.company} успешно отправлен. 
                  Мы уведомим вас о статусе рассмотрения.
                </p>
                <div className="space-y-3">
                  <Link to="/profile">
                    <Button className="w-full">
                      Посмотреть мои отклики
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full">
                      Продолжить поиск
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
          <Link to={`/jobs/${id}`}>
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Назад к вакансии</span>
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <h1 className="text-3xl font-bold text-gray-900">
                  Откликнуться на вакансию
                </h1>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-blue-600">{job.company}</p>
                  <p className="text-gray-600 text-sm">{job.location}</p>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Resume Upload */}
                  <div>
                    <Label htmlFor="resume" className="text-sm font-medium text-gray-700">
                      Резюме *
                    </Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          {resumeFile ? (
                            <p className="text-sm text-green-600 font-medium">
                              {resumeFile.name}
                            </p>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOC, DOCX (макс. 5MB)</p>
                            </>
                          )}
                        </div>
                        <input
                          id="resume"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Expected Salary */}
                  <div>
                    <Label htmlFor="expectedSalary" className="text-sm font-medium text-gray-700">
                      Ожидаемая зарплата
                    </Label>
                    <Input
                      id="expectedSalary"
                      type="text"
                      placeholder="от 150 000 ₽"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <Label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">
                      Сопроводительное письмо
                    </Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Расскажите о себе и почему вы подходите для этой позиции..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? 'Отправляем...' : 'Отправить отклик'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
