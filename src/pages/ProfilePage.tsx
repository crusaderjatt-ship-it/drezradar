import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-drez-charcoal">
      <Button variant="ghost" asChild className="mb-4 text-drez-charcoal hover:text-drez-charcoal/80">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-4">Profile Preferences</h1>
      <p className="text-lg mb-6">
        This page will allow users to manage their preferences, potentially with Google sign-in.
      </p>

      {/* Placeholder for preferences form */}
      <div className="space-y-4">
        <div className="p-4 border rounded-md bg-drez-pastel-green/30">
          <h2 className="text-xl font-semibold mb-2">User Settings</h2>
          <p>Coming soon: Options to save your favorite platforms or dress types.</p>
        </div>
        <div className="p-4 border rounded-md bg-drez-pastel-purple/30">
          <h2 className="text-xl font-semibold mb-2">Authentication</h2>
          <p>Coming soon: Google Sign-in integration.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;