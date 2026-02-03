export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  region?: string;
  phone?: string;
  opening_hours?: string;
  operating_hours?: string; // opening_hours의 별칭
  price_range?: string;
  description?: string;
  images?: string[];
  rating?: number;
  created_at?: string;
}

export interface Review {
  id: string;
  restaurant_id: string;
  user_id: string;
  rating: number;
  content: string;
  images?: string[];
  created_at?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  restaurant_id: string;
  created_at?: string;
}

export interface RoutePlan {
  id: string;
  user_id: string;
  name: string;
  restaurants: string[];
  created_at?: string;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
}


