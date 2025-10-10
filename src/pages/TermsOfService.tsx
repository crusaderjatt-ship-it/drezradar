"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Helmet>
        <title>Terms of Service | DrezRadar</title>
        <meta name="description" content="Read DrezRadar's Terms of Service to understand the rules and guidelines for using our website and services." />
        <link rel="canonical" href="https://drezradar.com/terms-of-service" />
      </Helmet>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 dark:text-foreground">Terms of Service for DrezRadar</h1>

        <p>Welcome to DrezRadar!</p>
        <p>
          These terms and conditions outline the rules and regulations for the use of DrezRadar's Website, located at drezradar.com.
        </p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use DrezRadar if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Cookies</h2>
        <p>
          We employ the use of cookies. By accessing DrezRadar, you agreed to use cookies in agreement with the DrezRadar's Privacy Policy.{" "}
        </p>
        <p>
          Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">License</h2>
        <p>
          Unless otherwise stated, DrezRadar owns the intellectual property rights for the DrezRadar platform, its original content, and design. All intellectual property rights for the platform are reserved. The news articles displayed on DrezRadar are sourced from third-party publishers via NewsAPI and their intellectual property rights remain with their respective original creators and publishers. You may access the DrezRadar platform and its content for your own personal, non-commercial use, subject to these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul className="list-disc list-inside">
          <li>Republish material from DrezRadar (including aggregated news articles) without proper authorization from the original source.</li>
          <li>Sell, rent or sub-license material from DrezRadar.</li>
          <li>Reproduce, duplicate or copy material from DrezRadar.</li>
          <li>Redistribute content from DrezRadar.</li>
        </ul>
        <p>
          This Agreement shall begin on the date hereof.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Hyperlinking to our Content</h2>
        <p>
          The following organizations may link to our Website without prior written approval:
        </p>
        <ul className="list-disc list-inside">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
          <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
        </ul>
        <p>
          These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
        </p>
        <p>
          We may consider and approve other link requests from the following types of organizations:
        </p>
        <ul className="list-disc list-inside">
          <li>commonly-known consumer and/or business information sources;</li>
          <li>dot.com community sites;</li>
          <li>associations or other groups representing charities;</li>
          <li>online directory distributors;</li>
          <li>internet portals;</li>
          <li>accounting, law and consulting firms; and</li>
          <li>educational institutions and trade associations.</li>
        </ul>
        <p>
          We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of DrezRadar; and (d) the link is in the context of general resource information.
        </p>
        <p>
          These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
        </p>
        <p>
          If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to DrezRadar. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
        </p>
        <p>
          Approved organizations may hyperlink to our Website as follows:
        </p>
        <ul className="list-disc list-inside">
          <li>By use of our corporate name; or</li>
          <li>By use of the uniform resource locator being linked to; or</li>
          <li>By use of any other description of our Website being linked to that makes sense within the context of the linking party's site's content.</li>
        </ul>
        <p>
          No use of DrezRadar's logo or other artwork will be allowed for linking absent a trademark license agreement.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">iFrames</h2>
        <p>
          Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Content Liability</h2>
        <p>
          We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Reservation of Rights</h2>
        <p>
          We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Removal of links from our website</h2>
        <p>
          If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
        </p>
        <p>
          We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
        </p>

        <h2 className="text-2xl font-semibold text-charcoal mt-8 mb-4 dark:text-foreground">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc list-inside">
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>
          The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;