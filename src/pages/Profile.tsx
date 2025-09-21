import React from 'react';
import { Helmet } from 'react-helmet-async'; // For SEO

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>DrezRadar - Profile</title>
        <meta name="description" content="Manage your DrezRadar profile and preferences." />
      </Helmet>
      <div className="min-h-[60vh] flex items-center justify-center bg-pastel-lavender rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-charcoal">Profile Page</h1>
          <p className="text-xl text-gray-700">
            This is where user preferences and settings will be managed.
          </p>
          <p className="text-md text-gray-600 mt-4">
            (Coming soon: Google Sign-in for saving preferences!)
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;