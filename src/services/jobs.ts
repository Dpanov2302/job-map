
import { Job } from '@/data/mockJobs';

export const jobsService = {
  // Получить все вакансии (из кэша или исходных данных)
  getJobs(): Job[] {
    try {
      const cachedJobs = localStorage.getItem('jobsCache');
      if (cachedJobs) {
        return JSON.parse(cachedJobs);
      }
      
      // Если кэша нет, загружаем из mockJobs и сохраняем в кэш
      const { mockJobs } = require('@/data/mockJobs');
      this.cacheJobs(mockJobs);
      return mockJobs;
    } catch (error) {
      console.error('Error reading jobs:', error);
      return [];
    }
  },

  // Сохранить вакансии в кэш
  cacheJobs(jobs: Job[]): void {
    localStorage.setItem('jobsCache', JSON.stringify(jobs));
  },

  // Получить собственные вакансии работодателя
  getMyJobs(): Job[] {
    try {
      const myJobs = localStorage.getItem('myJobs');
      return myJobs ? JSON.parse(myJobs) : [];
    } catch (error) {
      console.error('Error reading my jobs:', error);
      return [];
    }
  },

  // Добавить вакансию
  addJob(job: Omit<Job, 'id'>): Job {
    const myJobs = this.getMyJobs();
    const newJob: Job = {
      ...job,
      id: Date.now().toString()
    };

    myJobs.push(newJob);
    localStorage.setItem('myJobs', JSON.stringify(myJobs));

    // Также добавляем в общий кэш вакансий
    const allJobs = this.getJobs();
    allJobs.push(newJob);
    this.cacheJobs(allJobs);

    return newJob;
  },

  // Обновить вакансию
  updateJob(jobId: string, updates: Partial<Job>): void {
    const myJobs = this.getMyJobs();
    const jobIndex = myJobs.findIndex(job => job.id === jobId);
    
    if (jobIndex !== -1) {
      myJobs[jobIndex] = { ...myJobs[jobIndex], ...updates };
      localStorage.setItem('myJobs', JSON.stringify(myJobs));

      // Обновляем в общем кэше
      const allJobs = this.getJobs();
      const allJobIndex = allJobs.findIndex(job => job.id === jobId);
      if (allJobIndex !== -1) {
        allJobs[allJobIndex] = { ...allJobs[allJobIndex], ...updates };
        this.cacheJobs(allJobs);
      }
    }
  },

  // Удалить вакансию
  removeJob(jobId: string): void {
    const myJobs = this.getMyJobs();
    const filteredJobs = myJobs.filter(job => job.id !== jobId);
    localStorage.setItem('myJobs', JSON.stringify(filteredJobs));

    // Удаляем из общего кэша
    const allJobs = this.getJobs();
    const filteredAllJobs = allJobs.filter(job => job.id !== jobId);
    this.cacheJobs(filteredAllJobs);
  },

  // Найти вакансию по ID
  getJobById(jobId: string): Job | null {
    const allJobs = this.getJobs();
    return allJobs.find(job => job.id === jobId) || null;
  }
};
