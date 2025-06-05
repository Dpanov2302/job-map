
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobFormData } from '@/schemas/jobFormSchema';

interface JobFormFieldsProps {
  control: Control<JobFormData>;
}

const JobFormFields: React.FC<JobFormFieldsProps> = ({ control }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Название вакансии */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название вакансии *</FormLabel>
              <FormControl>
                <Input placeholder="Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Компания */}
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Компания *</FormLabel>
              <FormControl>
                <Input placeholder="Яндекс" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Местоположение */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Местоположение *</FormLabel>
              <FormControl>
                <Input placeholder="Москва" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Зарплата */}
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Зарплата *</FormLabel>
              <FormControl>
                <Input placeholder="200 000 - 300 000 ₽" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Опыт работы */}
        <FormField
          control={control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опыт работы *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите опыт" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Без опыта">Без опыта</SelectItem>
                  <SelectItem value="1-3 года">1-3 года</SelectItem>
                  <SelectItem value="3-6 лет">3-6 лет</SelectItem>
                  <SelectItem value="6+ лет">6+ лет</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Тип работы */}
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип работы *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                  <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
                  <SelectItem value="Проект">Проект</SelectItem>
                  <SelectItem value="Стажировка">Стажировка</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Логотип компании */}
      <FormField
        control={control}
        name="companyLogo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL логотипа компании</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/logo.png" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Технологии */}
      <FormField
        control={control}
        name="technologies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Технологии *</FormLabel>
            <FormControl>
              <Input placeholder="React, TypeScript, Node.js (через запятую)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Описание */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Описание вакансии *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Опишите вакансию, обязанности и что предлагаете..."
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Требования */}
      <FormField
        control={control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Требования *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Укажите требования к кандидату (каждое требование с новой строки)..."
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default JobFormFields;
