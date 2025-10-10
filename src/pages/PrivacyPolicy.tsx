"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Helmet>
        <title>Privacy Policy | DrezRadar</title>
        <meta name="description" content="Read DrezRadar's Privacy Policy to understand how we collect, use, and protect your personal data, including information related to Google AdSense and cookies." />
        <link rel="canonical" href="https://drezradar.com/privacy-policy" />
      </Helmet>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 dark:text-foreground">Privacy Policy for DrezRadar</h1>

        <p>
          At DrezRadar, accessible from drezradar.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DrezRadar and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Information we collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>
        <p>
          When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">How we use your information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc list-inside">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Google AdSense & Cookies</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to drezradar.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL –{" "}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            https://policies.google.com/technologies/ads
          </a>
          .
        </p>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
        </p>
        <ul className="list-disc list-inside">
          <li>
            Google
            <br />
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://policies.google.com/technologies/ads
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Third Party Privacy Policies</h2>
        <p>
          DrezRadar's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.{" "}
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>
          Under the CCPA, among other rights, California consumers have the right to:
        </p>
        <ul className="list-disc list-inside">
          <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">GDPR Data Protection Rights</h2>
        <p>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul className="list-disc list-inside">
          <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
          <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
          <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          DrezRadar does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;