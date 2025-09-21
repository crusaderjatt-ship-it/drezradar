import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <Card className="w-full max-w-md bg-pastel-purple text-charcoal shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Profile & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">This is where you can manage your DrezRadar preferences.</p>
            <p className="text-md text-gray-700">
              (Google Sign-in for saving preferences is an optional feature that can be added later.)
            </p>
            <Button asChild className="bg-pastel-green hover:bg-pastel-green/80 text-charcoal">
              <Link to="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;