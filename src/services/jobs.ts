
import { Job, mockJobs } from '@/data/mockJobs';

export const jobsService = {
  // Получить все вакансии (моковые + добавленные пользователем)
  getJobs(): Job[] {
    try {
      const baseJobs: Job[] = mockJobs;
      const myJobs = this.getMyJobs();
      const allJobs = [...baseJobs, ...myJobs];
      this.cacheJobs(allJobs);

      return allJobs;
    } catch (error) {
      console.error('Ошибка чтения вакансий:', error);
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
      console.error('Ошибка чтения моих вакансий:', error);
      return [];
    }
  },

  // Добавить вакансию
  addJob(job: Omit<Job, 'id'>): Job {
    const myJobs = this.getMyJobs();
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
    };

    // Сохраняем новую вакансию в разделе "мои вакансии"
    myJobs.push(newJob);
    localStorage.setItem('myJobs', JSON.stringify(myJobs));

    // Обновляем общий кэш: пересобираем mockJobs + myJobs
    this.getJobs();

    return newJob;
  },

  // Обновить вакансию
  updateJob(jobId: string, updates: Partial<Job>): void {
    // Обновляем в "мои вакансии"
    const myJobs = this.getMyJobs();
    const jobIndex = myJobs.findIndex((job) => job.id === jobId);
    if (jobIndex !== -1) {
      myJobs[jobIndex] = { ...myJobs[jobIndex], ...updates };
      localStorage.setItem('myJobs', JSON.stringify(myJobs));
    }

    // Обновляем общий кэш: пересобираем mockJobs + myJobs
    this.getJobs();
  },

  // Удалить вакансию
  removeJob(jobId: string): void {
    // Удаляем из "мои вакансии"
    const myJobs = this.getMyJobs();
    const filteredMyJobs = myJobs.filter((job) => job.id !== jobId);
    localStorage.setItem('myJobs', JSON.stringify(filteredMyJobs));

    // Обновляем общий кэш: пересобираем mockJobs + оставшиеся myJobs
    this.getJobs();
  },

  // Найти вакансию по ID
  getJobById(jobId: string): Job | null {
    // Берём уже объединённый список из getJobs()
    const allJobs = this.getJobs();
    return allJobs.find((job) => job.id === jobId) || null;
  },
};
