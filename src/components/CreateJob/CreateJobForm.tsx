
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { jobsService } from '@/services/jobs';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { jobSchema, JobFormData, getDefaultValues } from '@/schemas/jobFormSchema';
import JobFormFields from './JobFormFields';

const CreateJobForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data: JobFormData) => {
    try {
      // Парсим технологии из строки в массив
      const technologiesArray = data.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      // Парсим требования из строки в массив
      const requirementsArray = data.requirements
        .split('\n')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      // Генерируем случайные координаты для Москвы
      const moscowCoords = {
        lat: 55.7558 + (Math.random() - 0.5) * 0.1,
        lng: 37.6176 + (Math.random() - 0.5) * 0.1,
      };

      const jobData = {
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary,
        experience: data.experience,
        type: data.type,
        description: data.description,
        remote: data.remote,
        technologies: technologiesArray,
        requirements: requirementsArray,
        benefits: [
          'Конкурентная заработная плата',
          'Медицинское страхование',
          'Гибкий график работы',
          'Возможности профессионального развития'
        ],
        coords: moscowCoords,
        postedDate: new Date().toISOString(),
        companyLogo: data.companyLogo || '/api/placeholder/60/60',
      };

      const newJob = jobsService.addJob(jobData);
      
      toast({
        title: "Вакансия создана!",
        description: "Ваша вакансия успешно добавлена и опубликована.",
      });

      navigate('/jobs');
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать вакансию. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Информация о вакансии</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <JobFormFields control={form.control} />

            {/* Кнопки */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Отмена
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Создать вакансию
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateJobForm;
