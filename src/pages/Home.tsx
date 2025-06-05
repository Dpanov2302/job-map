
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Briefcase, TrendingUp, Code, Laptop, Database } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  const popularTechnologies = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Vue.js'
  ];

  const stats = [
    { icon: Briefcase, label: 'Активных вакансий', value: '2,847' },
    { icon: Users, label: 'IT-компаний', value: '1,234' },
    { icon: MapPin, label: 'Городов', value: '156' },
    { icon: TrendingUp, label: 'Новых вакансий в неделю', value: '342' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Найдите работу мечты в{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IT
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Тысячи актуальных вакансий от ведущих технологических компаний России
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Поиск по вакансиям, технологиям, компаниям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Поиск
              </Button>
            </div>
          </form>

          {/* Popular Technologies */}
          <div className="mb-12">
            <p className="text-gray-600 mb-4">Популярные технологии:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTechnologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    setSearchQuery(tech);
                    navigate(`/jobs?search=${encodeURIComponent(tech)}`);
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="text-center bg-white shadow-lg border-0">
            <CardHeader>
              <Code className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Все IT-специальности</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                От стажёров до senior-разработчиков, от фронтенда до DevOps
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white shadow-lg border-0">
            <CardHeader>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Интерактивная карта</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Находите вакансии рядом с домом или выбирайте удалённую работу
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white shadow-lg border-0">
            <CardHeader>
              <Laptop className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Удалённая работа</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Тысячи remote-вакансий для работы из любой точки мира
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
