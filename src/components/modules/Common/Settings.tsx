import { Button } from '@/components/ui/button';
import { ListRestartIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const Settings = () => {
    const navigate = useNavigate();
    const restartTour = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("tour_")) {
                localStorage.removeItem(key)
            }
        })
        navigate("/");
    }
    return (
        <div className='space-y-3 lg:p-5'>
            <h1 className="text-2xl font-bold">My Settings</h1>
            <div className='space-y-2 border p-5 rounded-md'>
                <h2 className='font-semibold'>Restart Tour Settings</h2>
                <p className='text-gray-800 text-sm'>Want a refresher? Restart the guided tour anytime to explore key features and navigation tips again.</p>
                <Button onClick={restartTour} variant="destructive"><ListRestartIcon/> Restart Tour</Button>
            </div>
        </div>
    );
};

export default Settings;