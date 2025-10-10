"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Helmet>
        <title>About Us & Contact | DrezRadar</title>
        <meta name="description" content="Learn more about DrezRadar, our mission to bring you the latest fashion news and trends, and how to contact us." />
        <link rel="canonical" href="https://drezradar.com/about" />
      </Helmet>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 dark:text-foreground">About DrezRadar</h1>

        <p>
          Welcome to DrezRadar, your ultimate destination for staying ahead in the dynamic world of fashion! We are dedicated to bringing you the freshest news, hottest trends, and insightful analyses from across the globe.
        </p>
        <p>
          Our mission is to be your go-to source for everything fashion-related, whether you're interested in the latest Gen Z styles, the rapid evolution of Fast Fashion, the timeless elegance of Royal Classics, or the rich heritage of Traditional attire. We believe fashion is a powerful form of self-expression and cultural commentary, and we're here to help you explore every facet of it.
        </p>
        <p>
          At DrezRadar, we curate content from leading fashion sources, social media platforms, and industry experts to provide a comprehensive and engaging experience. We aim to inspire, inform, and connect fashion enthusiasts worldwide.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Our Vision</h2>
        <p>
          To empower individuals with knowledge and inspiration, fostering a deeper appreciation for fashion's diverse influences and its impact on our lives.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Contact Us</h2>
        <p>
          We love hearing from our readers! If you have any questions, feedback, partnership inquiries, or just want to say hello, please don't hesitate to reach out.
        </p>
        <p>
          You can contact us via email at: <a href="mailto:contact@drezradar.com" className="text-primary hover:underline">contact@drezradar.com</a>
        </p>
        <p>
          We strive to respond to all inquiries within 2-3 business days.
        </p>
      </div>
    </div>
  );
};

export default About;