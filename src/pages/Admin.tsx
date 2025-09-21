import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Admin: React.FC = () => {
  const handleRefreshNow = () => {
    // In a real application, this would trigger a backend function
    // to refresh the trend data.
    toast.info("Initiating data refresh... (This is a placeholder action)");
    console.log("Admin: Refresh Now clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 min-h-[calc(100vh-200px)]">
      <Settings className="h-24 w-24 text-drez-charcoal mb-6" />
      <h1 className="text-4xl font-bold text-drez-charcoal mb-4">Admin Panel</h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-8">
        Manage platform configurations and trigger data refreshes.
      </p>

      <div className="space-y-4 w-full max-w-sm">
        <Button
          onClick={handleRefreshNow}
          className="w-full bg-drez-pastel-green text-drez-charcoal hover:bg-drez-pastel-green/80 px-8 py-3 text-lg font-semibold shadow-md flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Now
        </Button>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-drez-charcoal dark:text-white">
          <h2 className="text-xl font-semibold mb-2">Platform Configurations</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (This section would contain forms to edit `platform_configs` data, e.g., queries, geo lists, window minutes.)
          </p>
          <ul className="list-disc list-inside mt-4 text-sm text-gray-700 dark:text-gray-300">
            <li>TikTok: Active, Queries: #dress, #fashion</li>
            <li>Instagram: Active, Queries: #ootd, #style</li>
            <li>Pinterest: Active, Queries: dress ideas, fashion inspo</li>
            <li>X: Active, Queries: dress trends, viral fashion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;