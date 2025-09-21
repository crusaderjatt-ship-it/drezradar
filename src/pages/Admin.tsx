import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async'; // For SEO

const Admin = () => {
  const handleRefresh = () => {
    // In a real app, this would trigger a backend function to refresh data
    toast.info("Initiating data refresh... (Backend integration needed)");
    console.log("Manual data refresh triggered.");
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send updated platform_configs to the backend
    toast.success("Platform configurations saved! (Backend integration needed)");
    console.log("Saving platform configurations.");
  };

  return (
    <>
      <Helmet>
        <title>DrezRadar - Admin</title>
        <meta name="description" content="Admin panel for DrezRadar to manage data sources and trigger refreshes." />
      </Helmet>
      <div className="bg-pastel-lavender rounded-lg p-8 shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-charcoal text-center">Admin Panel</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-charcoal">Data Refresh</h2>
          <p className="text-gray-700 mb-4">
            Manually trigger a refresh of the trend data from all configured platforms.
            This will fetch new posts, update trend scores, and refresh the Top 10 lists.
          </p>
          <Button onClick={handleRefresh} className="bg-charcoal hover:bg-gray-700 text-white">
            Refresh Now
          </Button>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-charcoal">Platform Configurations</h2>
          <p className="text-gray-700 mb-6">
            Edit the configurations for each social media platform. This includes
            activating/deactivating platforms, defining search queries, geographical lists,
            and the data window for trend calculation.
          </p>
          <form onSubmit={handleSaveConfig} className="space-y-6">
            {/* Example for one platform, would be dynamic in a real app */}
            <div className="border p-6 rounded-md bg-white shadow-sm">
              <h3 className="text-xl font-medium mb-4 text-charcoal">TikTok Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tiktok-active" className="text-charcoal">Active</Label>
                  <Input id="tiktok-active" type="checkbox" defaultChecked className="mt-1 h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="tiktok-window" className="text-charcoal">Window (minutes)</Label>
                  <Input id="tiktok-window" type="number" defaultValue={60} className="mt-1 border-charcoal/30" />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="tiktok-queries" className="text-charcoal">Search Queries (comma-separated)</Label>
                <Textarea id="tiktok-queries" defaultValue="dress,fashion,style" rows={3} className="mt-1 border-charcoal/30" />
              </div>
              <div className="mt-4">
                <Label htmlFor="tiktok-geo" className="text-charcoal">Geo List (comma-separated)</Label>
                <Input id="tiktok-geo" type="text" defaultValue="US,GB,CA" className="mt-1 border-charcoal/30" />
              </div>
            </div>

            <Button type="submit" className="bg-charcoal hover:bg-gray-700 text-white">
              Save All Configurations
            </Button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Admin;