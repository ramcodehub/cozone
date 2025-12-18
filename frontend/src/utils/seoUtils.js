/**
 * SEO Utility Functions
 * Provides reusable SEO functions for dynamic meta tag updates
 */

/**
 * Updates page title and meta tags dynamically
 * @param {Object} seoData - SEO data object containing title, description, etc.
 */
export const updateMetaTags = (seoData) => {
  // Update title
  if (seoData.title) {
    document.title = seoData.title;
  }

  // Update meta description
  if (seoData.description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = seoData.description;
  }

  // Update canonical URL
  if (seoData.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = seoData.canonical;
  }

  // Update Open Graph tags
  updateOpenGraphTags(seoData);

  // Update Twitter tags
  updateTwitterTags(seoData);
};

/**
 * Updates Open Graph meta tags
 * @param {Object} seoData - SEO data object
 */
const updateOpenGraphTags = (seoData) => {
  const ogTags = {
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:url': seoData.canonical,
    'og:image': seoData.image,
    'og:type': seoData.type || 'website'
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    if (content) {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.property = property;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    }
  });
};

/**
 * Updates Twitter meta tags
 * @param {Object} seoData - SEO data object
 */
const updateTwitterTags = (seoData) => {
  const twitterTags = {
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    'twitter:image': seoData.image,
    'twitter:card': seoData.twitterCard || 'summary_large_image'
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    if (content) {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    }
  });
};

/**
 * Creates structured data script tag
 * @param {Object} schemaData - Schema.org structured data
 */
export const addStructuredData = (schemaData) => {
  const scriptId = 'structured-data';
  let scriptTag = document.getElementById(scriptId);
  
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = scriptId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  
  scriptTag.textContent = JSON.stringify(schemaData);
};

/**
 * SEO data for different pages
 */
export const pageSEOMetadata = {
  home: {
    title: 'CoZone - Premium Coworking Spaces in Hyderabad | Flexible Office Solutions',
    description: 'Transform the way you work together. CoZone brings teams closer with seamless collaboration tools and modern workspace solutions in Hyderabad.',
    canonical: 'https://cozone.com/',
    image: 'https://cozone.com/images/hero-image.jpg',
    type: 'website'
  },
  about: {
    title: 'About CoZone - Our Story & Mission | Premium Coworking Spaces',
    description: 'Learn about CoZone coworking spaces, our mission, values, and the story behind our creative workspace in Hyderabad.',
    canonical: 'https://cozone.com/about',
    image: 'https://cozone.com/images/about-image.jpg',
    type: 'website'
  },
  amenities: {
    title: 'Amenities at CoZone - Everything You Need to Work Better',
    description: 'Explore all the amenities that make your workday seamless at CoZone - high-speed WiFi, meeting rooms, 24/7 power backup, ergonomic seating, and more.',
    canonical: 'https://cozone.com/amenities',
    image: 'https://cozone.com/images/amenities-image.jpg',
    type: 'website'
  },
  plans: {
    title: 'CoZone Membership Plans - Flexible Coworking Solutions',
    description: 'Discover our flexible membership plans for private cabins, dedicated desks, day passes, conference rooms, and virtual office services in Hyderabad.',
    canonical: 'https://cozone.com/plans',
    image: 'https://cozone.com/images/plans-image.jpg',
    type: 'website'
  },
  gallery: {
    title: 'CoZone Gallery - Take a Look Inside Our Workspace',
    description: 'Browse our workspace gallery to see every corner of CoZone - private cabins, open desks, lounge areas, meeting spaces, and more in Hyderabad.',
    canonical: 'https://cozone.com/gallery',
    image: 'https://cozone.com/images/gallery-image.jpg',
    type: 'website'
  },
  dayPass: {
    title: 'Day Pass - Flexible Coworking Access | CoZone',
    description: 'Get flexible access to our premium coworking space with our day pass option. Perfect for freelancers, remote workers, and occasional visitors.',
    canonical: 'https://cozone.com/day-pass',
    image: 'https://cozone.com/images/day-pass-image.jpg',
    type: 'website'
  },
  privateCabins: {
    title: 'Private Cabins - Dedicated Office Spaces | CoZone',
    description: 'Experience privacy and focus in our fully equipped private cabins. Ideal for teams and businesses seeking a dedicated workspace in Hyderabad.',
    canonical: 'https://cozone.com/private-cabins',
    image: 'https://cozone.com/images/private-cabins-image.jpg',
    type: 'website'
  },
  dedicatedDesk: {
    title: 'Dedicated Desks - Your Personal Workspace | CoZone',
    description: 'Secure your personal workspace with our dedicated desk membership. Enjoy all amenities with your own designated area in our coworking space.',
    canonical: 'https://cozone.com/dedicated-desk',
    image: 'https://cozone.com/images/dedicated-desk-image.jpg',
    type: 'website'
  },
  conferenceRooms: {
    title: 'Conference Rooms - Professional Meeting Spaces | CoZone',
    description: 'Host successful meetings in our professional conference rooms equipped with modern technology and comfortable seating for all your business needs.',
    canonical: 'https://cozone.com/conference-rooms',
    image: 'https://cozone.com/images/conference-rooms-image.jpg',
    type: 'website'
  },
  virtualZone: {
    title: 'Virtual Zone - Remote Business Services | CoZone',
    description: 'Access professional business services remotely with our Virtual Zone membership. Get a prestigious business address and essential services.',
    canonical: 'https://cozone.com/virtual-zone',
    image: 'https://cozone.com/images/virtual-zone-image.jpg',
    type: 'website'
  },
  customBuiltOffice: {
    title: 'Custom Built Office Spaces - Tailored Solutions | CoZone',
    description: 'Create your ideal workspace with our custom built office solutions. Designed exclusively for your team with personalized layouts and amenities.',
    canonical: 'https://cozone.com/custom-built-office',
    image: 'https://cozone.com/images/custom-built-office-image.jpg',
    type: 'website'
  }
};

export default {
  updateMetaTags,
  addStructuredData,
  pageSEOMetadata
};