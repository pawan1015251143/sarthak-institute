import { useEffect } from 'react';

const useSEO = ({ title, description, path }) => {
  useEffect(() => {
    // 1. Update Title
    const siteTitle = 'Sarthak Institute Lalganj | Best Coaching Institute in Lalganj, Vaishali';
    const newTitle = title ? `${title} | Sarthak Institute Lalganj` : siteTitle;
    document.title = newTitle;

    // Update Open Graph and Twitter Titles
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', newTitle);
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', newTitle);

    // 2. Update Description
    const defaultDesc = 'Sarthak Institute Lalganj is a trusted coaching institute in Lalganj, Vaishali, Bihar. We provide quality education, experienced faculty, and excellent results for students.';
    const newDesc = description || defaultDesc;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', newDesc);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', newDesc);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', newDesc);

    // 3. Update Canonical URL & OG URL
    const baseUrl = 'https://sarthak-institute.vercel.app';
    const currentUrl = path ? `${baseUrl}${path}` : window.location.href;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentUrl);

  }, [title, description, path]);
};

export default useSEO;
