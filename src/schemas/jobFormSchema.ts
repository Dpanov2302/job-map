
import * as z from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1, 'Название вакансии обязательно'),
  company: z.string().min(1, 'Название компании обязательно'),
  location: z.string().min(1, 'Местоположение обязательно'),
  salary: z.string().min(1, 'Зарплата обязательна'),
  experience: z.string().min(1, 'Опыт работы обязателен'),
  type: z.string().min(1, 'Тип работы обязателен'),
  description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
  requirements: z.string().min(10, 'Требования должны содержать минимум 10 символов'),
  technologies: z.string().min(1, 'Технологии обязательны'),
  companyLogo: z.string().url('Введите корректный URL логотипа').optional().or(z.literal('')),
  remote: z.boolean().default(false),
});

export type JobFormData = z.infer<typeof jobSchema>;

export const getDefaultValues = (): JobFormData => ({
  title: '',
  company: '',
  location: '',
  salary: '',
  experience: '',
  type: '',
  description: '',
  requirements: '',
  technologies: '',
  companyLogo: '',
  remote: false,
});
