import React from "react";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

const Profile: React.FC = () => {
  // Placeholder for Google Sign-in and preferences
  const handleGoogleSignIn = () => {
    // Implement Google Sign-in logic here using Supabase Auth
    console.log("Google Sign-in clicked!");
    // Example: supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 min-h-[calc(100vh-200px)]">
      <UserCircle className="h-24 w-24 text-drez-charcoal mb-6" />
      <h1 className="text-4xl font-bold text-drez-charcoal mb-4">Your Profile</h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-8">
        Sign in to save your preferences and personalize your DrezRadar experience.
      </p>
      <Button
        onClick={handleGoogleSignIn}
        className="bg-drez-pastel-purple text-drez-charcoal hover:bg-drez-pastel-purple/80 px-8 py-3 text-lg font-semibold shadow-md"
      >
        Sign in with Google
      </Button>
      <div className="mt-8 text-gray-500 text-sm">
        <p>Preferences will appear here after sign-in.</p>
      </div>
    </div>
  );
};

export default Profile;