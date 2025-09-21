import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

const AdminPage = () => {
  const handleRefresh = () => {
    toast.info("Refreshing data... (This would trigger a backend process)");
    // In a real application, this would trigger a backend API call
    // to refresh the trend data.
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <Card className="w-full max-w-md bg-pastel-purple text-charcoal shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg">Manage data sources and trigger manual refreshes.</p>
            <Button onClick={handleRefresh} className="bg-pastel-green hover:bg-pastel-green/80 text-charcoal flex items-center gap-2">
              <RefreshCcw className="h-5 w-5" /> Refresh Now
            </Button>
            <p className="text-md text-gray-700">
              (Editing platform configurations and automated scheduling would be handled by your backend.)
            </p>
            <Button asChild className="bg-charcoal hover:bg-charcoal/80 text-white">
              <Link to="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminPage;