export type Term = { slug: string; name: string };

export type ItineraryDay = {
  title: string;
  description: string;
  location?: string;
  image?: string;
};

export type Tour = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  price: string;
  product_regular_price: string | null;
  product_price: string | null;
  destination: string;
  city: string;
  state: string;
  address: string;
  people_limit: string;
  highlights: string[] | string;
  itinerary: ItineraryDay[] | string | false;
  featured_image: string | null;
  gallery: string[];
  categories: Term[];
  country: Term[];
  duration_days: Term[];
  duration_nights: Term[];
  includes: Term[];
  excludes: Term[];
  activities: Term[];
  why_book: Term[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  count: number;
  image: string | null;
};

export type Blog = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  categories: Term[];
};
