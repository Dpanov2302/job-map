import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';


const AddVacancyFab = () => {
    const { role } = useRole();
    const { isAuthenticated } = useAuth();

    // Show only for employers on mobile
    if (!(isAuthenticated && role === 'employer')) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden fixed top-[4.5rem] right-4 z-50" // 4.5rem ≈ header height, adjust if needed
        >
            <Link to="/create-job">
                <Button
                    size="icon"
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:scale-105 focus:ring-4 focus:ring-purple-300 transition-transform"
                >
                    <Plus className="w-5 h-5 text-white" />
                </Button>
            </Link>
        </motion.div>
    );
};

export default AddVacancyFab;
