import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SpinRadarButtonProps {
  trends: any[]; // Replace 'any' with your actual Trend type
}

const SpinRadarButton: React.FC<SpinRadarButtonProps> = ({ trends }) => {
  const navigate = useNavigate();

  const handleSpin = () => {
    if (trends.length === 0) {
      toast.info("No trends available to spin the radar!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * trends.length);
    const randomTrend = trends[randomIndex];
    toast.success(`Spinning to: ${randomTrend.dress_type} on ${randomTrend.platform}!`);
    navigate(`/trend/${randomTrend.platform.toLowerCase()}/${randomTrend.dress_type.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Button
      onClick={handleSpin}
      className="w-full md:w-auto bg-charcoal text-white hover:bg-gray-700 transition-colors duration-300 py-6 px-8 text-lg font-bold rounded-lg shadow-md flex items-center justify-center space-x-2"
    >
      <Sparkles className="h-6 w-6 animate-pulse" />
      <span>Spin the Radar 🎡</span>
    </Button>
  );
};

export default SpinRadarButton;