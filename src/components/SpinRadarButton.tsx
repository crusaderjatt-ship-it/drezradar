import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMockRandomTrend } from "@/lib/mock-data";

const SpinRadarButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSpin = () => {
    const randomTrend = getMockRandomTrend();
    if (randomTrend) {
      navigate(`/trend/${randomTrend.platform}/${randomTrend.dress_type.replace(/\s+/g, '-')}`);
    }
  };

  return (
    <Button
      onClick={handleSpin}
      className="w-full md:w-auto bg-drez-pastel-purple text-drez-charcoal hover:bg-drez-pastel-purple/80 transition-colors duration-200 py-6 text-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
    >
      <Sparkles className="h-5 w-5" />
      Spin the Radar 🎡
    </Button>
  );
};

export default SpinRadarButton;