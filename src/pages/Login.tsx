"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/components/SessionContextProvider';
import { Helmet } from 'react-helmet-async';

const Login: React.FC = () => {
  const { session } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Helmet>
        <title>Login | DrezRadar</title>
        <meta name="description" content="Log in or sign up to DrezRadar to manage your fashion preferences and access exclusive content." />
        <link rel="canonical" href="https://drezradar.com/login" />
      </Helmet>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h1 className="text-3xl font-bold text-center text-charcoal mb-6">Welcome to DrezRadar</h1>
        <Auth
          supabaseClient={supabase}
          providers={[]} // Only email/password for now, can add 'google', 'github' etc.
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary-foreground))',
                  inputBackground: 'hsl(var(--input))',
                  inputBorder: 'hsl(var(--border))',
                  inputBorderHover: 'hsl(var(--ring))',
                  inputBorderFocus: 'hsl(var(--ring))',
                  inputText: 'hsl(var(--foreground))',
                  defaultButtonBackground: 'hsl(var(--secondary))',
                  defaultButtonBackgroundHover: 'hsl(var(--secondary-foreground))',
                  defaultButtonBorder: 'hsl(var(--border))',
                  defaultButtonText: 'hsl(var(--charcoal))',
                },
              },
            },
          }}
          theme="light" // Theme will be handled by ThemeProvider, but Auth UI needs a base
        />
      </div>
    </div>
  );
};

export default Login;