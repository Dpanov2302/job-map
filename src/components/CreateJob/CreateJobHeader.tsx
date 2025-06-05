
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CreateJobHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад</span>
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Создать вакансию</h1>
        <p className="text-gray-600">Опубликуйте новую вакансию для поиска сотрудников</p>
      </div>
    </div>
  );
};

export default CreateJobHeader;
