
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Building, Clock, DollarSign, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '@/data/mockJobs';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={job.companyLogo} 
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                  {job.title}
                </h3>
                <p className="text-blue-600 font-medium">{job.company}</p>
              </div>
            </div>
            {job.remote && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                Remote
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <DollarSign className="w-4 h-4 mr-2" />
              {job.salary}
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {job.experience}
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <Building className="w-4 h-4 mr-2" />
              {job.type}
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {job.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {job.technologies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.technologies.length - 3}
                </Badge>
              )}
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mt-3">
              {job.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-gray-500">
              {new Date(job.postedDate).toLocaleDateString('ru-RU')}
            </span>
            <Link to={`/jobs/${job.id}`}>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Подробнее
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JobCard;
