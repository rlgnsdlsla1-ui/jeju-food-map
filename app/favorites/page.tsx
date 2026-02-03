'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Restaurant } from '@/lib/types';
import { getCurrentUser } from '@/lib/firebase-auth';

export default function FavoritesPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const user = getCurrentUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/favorites?user_id=${user.uid}`);
      if (response.ok) {
        const favorites = await response.json();
        const restaurants = favorites.map((fav: any) => fav.restaurants).filter(Boolean);
        setRestaurants(restaurants);
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">즐겨찾기</h1>

        {restaurants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">즐겨찾기한 맛집이 없습니다.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              맛집 둘러보기 →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-2">{restaurant.address}</p>
                {restaurant.category && (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {restaurant.category}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


