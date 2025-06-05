
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  onSearch: (query: string) => void;
}

const SearchFilters = ({ onFiltersChange, onSearch }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    type: '',
    remote: '',
  });

  const technologies = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
    'JavaScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
    onFiltersChange({ 
      ...filters, 
      technologies: selectedTech,
      query: searchQuery 
    });
  };

  const addTechnology = (tech: string) => {
    if (!selectedTech.includes(tech)) {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const removeTechnology = (tech: string) => {
    setSelectedTech(selectedTech.filter(t => t !== tech));
  };

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange({ 
      ...newFilters, 
      technologies: selectedTech,
      query: searchQuery 
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="space-y-6">
        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Поиск по должности, компании или навыкам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => updateFilter('location', value)}>
            <SelectTrigger className="h-12">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              <SelectItem value="moscow">Москва</SelectItem>
              <SelectItem value="spb">Санкт-Петербург</SelectItem>
              <SelectItem value="ekb">Екатеринбург</SelectItem>
              <SelectItem value="nsk">Новосибирск</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('experience', value)}>
            <SelectTrigger className="h-12">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Опыт" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любой опыт</SelectItem>
              <SelectItem value="no-experience">Без опыта</SelectItem>
              <SelectItem value="1-3">1-3 года</SelectItem>
              <SelectItem value="3-6">3-6 лет</SelectItem>
              <SelectItem value="6+">6+ лет</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger className="h-12">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Тип работы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="full-time">Полная занятость</SelectItem>
              <SelectItem value="part-time">Частичная занятость</SelectItem>
              <SelectItem value="contract">Контракт</SelectItem>
              <SelectItem value="internship">Стажировка</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('remote', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Удаленная работа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все варианты</SelectItem>
              <SelectItem value="remote">Удаленно</SelectItem>
              <SelectItem value="hybrid">Гибрид</SelectItem>
              <SelectItem value="office">Офис</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Технологии */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Технологии
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addTechnology(tech)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                disabled={selectedTech.includes(tech)}
              >
                {tech}
              </motion.button>
            ))}
          </div>
          
          {selectedTech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTech.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeTechnology(tech)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleSearch}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
        >
          Найти вакансии
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchFilters;
