
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchFilters from '@/components/SearchFilters';
import JobCard from '@/components/JobCard';
import JobMap from '@/components/JobMap';
import { Button } from '@/components/ui/button';
import { mockJobs, Job } from '@/data/mockJobs';
import { List, Map } from 'lucide-react';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    const filtered = mockJobs.filter(job =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase()) ||
      job.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockJobs];

    // Apply search query
    if (filters.query) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.technologies.some((tech: string) => tech.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }

    // Apply location filter
    if (filters.location && filters.location !== 'all') {
      const locationMap: { [key: string]: string } = {
        moscow: 'Москва',
        spb: 'Санкт-Петербург',
        ekb: 'Екатеринбург',
        nsk: 'Новосибирск',
      };
      const locationName = locationMap[filters.location];
      if (locationName) {
        filtered = filtered.filter(job => job.location === locationName);
      }
    }

    // Apply experience filter
    if (filters.experience && filters.experience !== 'all') {
      filtered = filtered.filter(job => {
        const exp = job.experience.toLowerCase();
        switch (filters.experience) {
          case 'no-experience':
            return exp.includes('без опыта') || exp.includes('стажер');
          case '1-3':
            return exp.includes('1-3') || exp.includes('2-4');
          case '3-6':
            return exp.includes('3-6') || exp.includes('4-7');
          case '6+':
            return exp.includes('6+') || exp.includes('senior');
          default:
            return true;
        }
      });
    }

    // Apply remote filter
    if (filters.remote && filters.remote !== 'all') {
      switch (filters.remote) {
        case 'remote':
          filtered = filtered.filter(job => job.remote === true);
          break;
        case 'office':
          filtered = filtered.filter(job => job.remote === false);
          break;
        // 'hybrid' would need additional data in mock
      }
    }

    // Apply technology filter
    if (filters.technologies && filters.technologies.length > 0) {
      filtered = filtered.filter(job =>
        filters.technologies.some((tech: string) =>
          job.technologies.some(jobTech => jobTech.toLowerCase() === tech.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            IT Вакансии
          </h1>
          <p className="text-gray-600 text-lg">
            Найдено {filteredJobs.length} вакансий
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters 
            onSearch={handleSearch}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center space-x-2"
            >
              <List className="w-4 h-4" />
              <span>Список</span>
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
              className="flex items-center space-x-2"
            >
              <Map className="w-4 h-4" />
              <span>Карта</span>
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === 'list' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Список вакансий</h3>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedJob?.id === job.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <JobMap 
                jobs={filteredJobs}
                selectedJob={selectedJob}
                onJobSelect={setSelectedJob}
                height="600px"
              />
            </div>
          </motion.div>
        )}

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Вакансии не найдены
            </h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить критерии поиска или фильтры
            </p>
            <Button onClick={() => window.location.reload()}>
              Сбросить фильтры
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
