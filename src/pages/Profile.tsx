"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSupabase } from "@/components/SessionContextProvider"; // Import useSupabase
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { supabase, session } = useSupabase();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({ first_name: null, last_name: null, avatar_url: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const getProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile(data);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error); // Log full error object
        toast.error('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session, navigate, supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      toast.error('Failed to log out.');
    } else {
      toast.success('Logged out successfully!');
      navigate('/login');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', session.user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error); // Log full error object
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading profile...
      </div>
    );
  }

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

        <Card className="bg-card p-6 rounded-lg shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-charcoal">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-charcoal-light mb-4">Email: {session?.user?.email}</p>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-charcoal">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.first_name || ''}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  className="mt-1 bg-input text-foreground"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-charcoal">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.last_name || ''}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  className="mt-1 bg-input text-foreground"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Button
          onClick={handleLogout}
          className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          disabled={loading}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;