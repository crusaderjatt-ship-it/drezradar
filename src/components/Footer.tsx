"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-background border-t border-border py-8 px-4 md:px-8 mt-12"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="text-sm text-charcoal-light dark:text-gray-400">
          &copy; {new Date().getFullYear()} DrezRadar. All rights reserved.
        </div>
        <nav
          className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm"
          aria-label="Footer navigation"
          role="navigation"
        >
          <Link
            to="/about"
            className="text-charcoal-light hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1"
          >
            About Us
          </Link>
          <Link
            to="/privacy-policy"
            className="text-charcoal-light hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-charcoal-light hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;