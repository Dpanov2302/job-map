
import React from 'react';
import { motion } from 'framer-motion';
import CreateJobHeader from '@/components/CreateJob/CreateJobHeader';
import CreateJobForm from '@/components/CreateJob/CreateJobForm';

const CreateJob = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <CreateJobHeader />
        <CreateJobForm />
      </motion.div>
    </div>
  );
};

export default CreateJob;
