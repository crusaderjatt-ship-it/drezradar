import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Edit } from 'lucide-react';
import { toast } from 'sonner';

const AdminPage: React.FC = () => {
  const handleRefreshData = () => {
    toast.info("Refreshing data... (This would trigger a backend process)");
    // In a real app, this would call a backend endpoint to trigger the data refresh
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-drez-charcoal">
      <Button variant="ghost" asChild className="mb-4 text-drez-charcoal hover:text-drez-charcoal/80">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg mb-6">
        This page will allow administrators to manage data sources and trigger data refreshes.
      </p>

      <div className="space-y-6">
        <div className="p-4 border rounded-md bg-drez-pastel-pink/30 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Data Refresh</h2>
            <p className="text-drez-charcoal/80">Manually trigger a refresh of all trend data from social media APIs.</p>
          </div>
          <Button onClick={handleRefreshData} className="bg-drez-charcoal text-white hover:bg-drez-charcoal/80">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Now
          </Button>
        </div>

        <div className="p-4 border rounded-md bg-drez-pastel-purple/30 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Platform Configurations</h2>
            <p className="text-drez-charcoal/80">Edit active platforms, queries, and geographical settings.</p>
          </div>
          <Button className="bg-drez-charcoal text-white hover:bg-drez-charcoal/80">
            <Edit className="mr-2 h-4 w-4" /> Edit Configurations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;