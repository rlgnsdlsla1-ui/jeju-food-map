'use client';

import { Restaurant } from '@/lib/types';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClose?: () => void;
}

export default function RestaurantCard({ restaurant, onClose }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        {restaurant.category && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              {restaurant.category}
            </span>
            {restaurant.rating && (
              <span className="text-sm text-gray-600">
                ⭐ {restaurant.rating.toFixed(1)}
              </span>
            )}
          </div>
        )}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-2">{restaurant.address}</span>
        </div>
        {restaurant.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{restaurant.phone}</span>
          </div>
        )}
        {restaurant.operating_hours && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="line-clamp-2">{restaurant.operating_hours}</span>
          </div>
        )}
        {restaurant.price_range && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{restaurant.price_range}</span>
          </div>
        )}
      </div>

      {restaurant.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{restaurant.description}</p>
      )}

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <FavoriteButton restaurantId={restaurant.id} />
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          상세보기
        </Link>
      </div>
    </div>
  );
}


