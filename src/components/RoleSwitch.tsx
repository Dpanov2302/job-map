
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRole } from '@/contexts/RoleContext';
import { User, Building2 } from 'lucide-react';

const RoleSwitch = () => {
  const { role, toggleRole } = useRole();

  return (
    <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
      <div className="flex items-center space-x-2">
        <User className="w-4 h-4 text-blue-600" />
        <Label 
          htmlFor="role-switch" 
          className={`text-sm font-medium cursor-pointer transition-colors ${
            role === 'candidate' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          Соискатель
        </Label>
      </div>
      
      <Switch
        id="role-switch"
        checked={role === 'employer'}
        onCheckedChange={toggleRole}
        className="data-[state=checked]:bg-purple-600"
      />
      
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-purple-600" />
        <Label 
          htmlFor="role-switch" 
          className={`text-sm font-medium cursor-pointer transition-colors ${
            role === 'employer' ? 'text-purple-600' : 'text-gray-500'
          }`}
        >
          Работодатель
        </Label>
      </div>
    </div>
  );
};

export default RoleSwitch;
