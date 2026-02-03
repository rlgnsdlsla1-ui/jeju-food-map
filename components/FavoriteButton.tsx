'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/firebase-auth';

interface FavoriteButtonProps {
  restaurantId: string;
}

export default function FavoriteButton({ restaurantId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (userId) {
      checkFavorite();
    }
  }, [userId, restaurantId]);

  const checkUser = async () => {
    try {
      const user = getCurrentUser();
      setUserId(user?.uid || null);
    } catch (error) {
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/favorites?user_id=${userId}&restaurant_id=${restaurantId}`);
      if (response.ok) {
        const favorites = await response.json();
        setIsFavorite(favorites.length > 0);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (isFavorite) {
        const response = await fetch(
          `/api/favorites?user_id=${userId}&restaurant_id=${restaurantId}`,
          { method: 'DELETE' }
        );
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            restaurant_id: restaurantId,
          }),
        });
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading || !userId) {
    return null;
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded ${
        isFavorite
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {isFavorite ? '❤️ 즐겨찾기 해제' : '🤍 즐겨찾기 추가'}
    </button>
  );
}


