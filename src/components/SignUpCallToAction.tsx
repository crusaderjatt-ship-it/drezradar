"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, UserPlus, Heart } from 'lucide-react';

const SignUpCallToAction: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg p-6 my-12 border-primary/20 border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-charcoal dark:text-foreground mb-2">
          Unlock More with DrezRadar!
        </CardTitle>
        <CardDescription className="text-lg text-charcoal-light dark:text-gray-400">
          Sign up for a free account to personalize your fashion journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <UserPlus className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-charcoal dark:text-foreground text-lg">Manage Your Profile</h3>
            <p className="text-sm text-charcoal-light dark:text-gray-400">Keep your details updated and ready for a personalized experience.</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-charcoal dark:text-foreground text-lg">Save Your Favorites</h3>
            <p className="text-sm text-charcoal-light dark:text-gray-400">Bookmark articles and trends you love (coming soon!).</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold text-charcoal dark:text-foreground text-lg">Personalized Content</h3>
            <p className="text-sm text-charcoal-light dark:text-gray-400">Get recommendations tailored to your style (coming soon!).</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/login">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-105">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpCallToAction;