import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { Progress } from "@/components/ui/progress"; // Import the Progress component

const Admin = () => {
  // Mock state for platform configurations
  const [platformConfigs, setPlatformConfigs] = React.useState([
    { platform: "TikTok", active: true, queries: ["#dresstok", "#tiktokfashion"], geo_list: ["US"], window_minutes: 60 },
    { platform: "Instagram", active: true, queries: ["#instafashion", "#dressstyle"], geo_list: ["US", "UK"], window_minutes: 120 },
    { platform: "Pinterest", active: true, queries: ["dress trends", "pinterest fashion"], geo_list: ["US"], window_minutes: 180 },
    { platform: "X", active: false, queries: ["dress", "fashion"], geo_list: ["US"], window_minutes: 30 },
  ]);

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [refreshProgress, setRefreshProgress] = React.useState(0);

  const handleRefreshNow = () => {
    setIsRefreshing(true);
    setRefreshProgress(0);
    toast.loading("Refreshing news data...", { id: "refresh-toast" });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setRefreshProgress(progress);
      }
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRefreshing(false);
          setRefreshProgress(0);
          toast.success("News data refresh completed!", { id: "refresh-toast" });
          console.log("Manual news data refresh triggered and completed!");
        }, 500); // Small delay to show 100%
      }
    }, 300); // Update progress every 300ms
  };

  const handleSeedTrendPosts = async () => {
    toast.loading("Seeding mock trend posts...", { id: "seed-trends-toast" });
    try {
      const SUPABASE_PROJECT_ID = "ztiyfozzzmocpzewedls";
      const EDGE_FUNCTION_NAME = "seed-trend-posts";
      const url = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/${EDGE_FUNCTION_NAME}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to seed trend posts.');
      }

      const data = await response.json();
      toast.success(data.message || "Mock trend posts seeded successfully!", { id: "seed-trends-toast" });
      console.log("Seed trend posts response:", data);
    } catch (error: any) {
      toast.error(`Error seeding trend posts: ${error.message}`, { id: "seed-trends-toast" });
      console.error("Error seeding trend posts:", error);
    }
  };

  const handleConfigChange = (index: number, field: string, value: any) => {
    const newConfigs = [...platformConfigs];
    if (field === "queries" || field === "geo_list") {
      newConfigs[index] = { ...newConfigs[index], [field]: value.split(',').map((item: string) => item.trim()) };
    } else {
      newConfigs[index] = { ...newConfigs[index], [field]: value };
    }
    setPlatformConfigs(newConfigs);
    toast.success("Configuration updated locally (backend integration needed)", { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Helmet>
        <title>Admin Dashboard | DrezRadar</title>
        <meta name="description" content="Manage DrezRadar platform configurations, data refresh, and other administrative settings." />
        <link rel="canonical" href="https://drezradar.com/admin" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">Admin Dashboard</h1>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start"> {/* Adjusted items-start for better alignment */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <Button
              onClick={handleRefreshNow}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md shadow-lg text-lg"
              disabled={isRefreshing}
            >
              {isRefreshing ? "Refreshing..." : "Refresh News Data Now"}
            </Button>
            {isRefreshing && (
              <Progress value={refreshProgress} className="w-full h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-primary" />
            )}
          </div>
          <Button
            onClick={handleSeedTrendPosts}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md shadow-lg text-lg"
          >
            Seed Mock Trend Posts
          </Button>
          <p className="text-sm text-charcoal-light mt-2 sm:mt-0">
            Triggers an immediate data fetch and processing cycle for news, and seeds mock trend posts.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-charcoal mb-4">Platform Configurations</h2>
        <div className="grid grid-cols-1 gap-6">
          {platformConfigs.map((config, index) => (
            <Card key={config.platform} className="bg-card text-card-foreground rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-charcoal">{config.platform}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`active-${config.platform}`} className="text-charcoal">Active</Label>
                  <Switch
                    id={`active-${config.platform}`}
                    checked={config.active}
                    onCheckedChange={(checked) => handleConfigChange(index, "active", checked)}
                  />
                </div>
                <div>
                  <Label htmlFor={`queries-${config.platform}`} className="text-charcoal">Queries (comma-separated)</Label>
                  <Input
                    id={`queries-${config.platform}`}
                    value={config.queries.join(', ')}
                    onChange={(e) => handleConfigChange(index, "queries", e.target.value)}
                    className="mt-1 bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor={`geo-${config.platform}`} className="text-charcoal">Geo List (comma-separated)</Label>
                  <Input
                    id={`geo-${config.platform}`}
                    value={config.geo_list.join(', ')}
                    onChange={(e) => handleConfigChange(index, "geo_list", e.target.value)}
                    className="mt-1 bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor={`window-${config.platform}`} className="text-charcoal">Window (minutes)</Label>
                  <Input
                    id={`window-${config.platform}`}
                    type="number"
                    value={config.window_minutes}
                    onChange={(e) => handleConfigChange(index, "window_minutes", parseInt(e.target.value))}
                    className="mt-1 bg-input text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;