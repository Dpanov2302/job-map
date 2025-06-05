
export interface Reply {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  date: string;
  resumeUrl: string;
  resumeFileName: string;
  coverLetter: string;
  phone: string;
  expectedSalary: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
}

export const repliesService = {
  // Получить все отклики
  getReplies(): Reply[] {
    try {
      const replies = localStorage.getItem('replies');
      return replies ? JSON.parse(replies) : [];
    } catch (error) {
      console.error('Error reading replies:', error);
      return [];
    }
  },

  // Добавить отклик
  addReply(jobId: string, jobTitle: string, company: string, resumeFileName: string, coverLetter: string, phone: string, expectedSalary: string): void {
    const replies = this.getReplies();
    const newReply: Reply = {
      id: Date.now().toString(),
      jobId,
      jobTitle,
      company,
      date: new Date().toISOString(),
      resumeUrl: `mock_resume_${Date.now()}`,
      resumeFileName,
      coverLetter,
      phone,
      expectedSalary,
      status: 'pending'
    };

    replies.push(newReply);
    localStorage.setItem('replies', JSON.stringify(replies));
  },

  // Обновить статус отклика
  updateReplyStatus(replyId: string, status: Reply['status']): void {
    const replies = this.getReplies();
    const replyIndex = replies.findIndex(reply => reply.id === replyId);
    
    if (replyIndex !== -1) {
      replies[replyIndex].status = status;
      localStorage.setItem('replies', JSON.stringify(replies));
    }
  },

  // Проверить, есть ли отклик на вакансию
  hasRepliedToJob(jobId: string): boolean {
    const replies = this.getReplies();
    return replies.some(reply => reply.jobId === jobId);
  }
};
