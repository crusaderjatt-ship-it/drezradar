import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet

const Profile = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center justify-center">
      <Helmet>
        <title>User Profile & Preferences | DrezRadar</title>
        <meta name="description" content="Manage your DrezRadar profile and preferences, including favorite dress types and notification settings." />
        <link rel="canonical" href="https://drezradar.com/profile" />
      </Helmet>
      <div className="max-w-md w-full text-center">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">Profile & Preferences</h1>
        <p className="text-lg text-charcoal-light mb-8">
          This is where user preferences and settings will be managed.
          (e.g., favorite dress types, notification settings, etc.)
        </p>
        {/* Placeholder for future profile content */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <p className="text-charcoal">Coming soon: Google Sign-in for saving preferences!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;