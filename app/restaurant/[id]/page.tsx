'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Restaurant, Review } from '@/lib/types';
import ReviewForm from '@/components/ReviewForm';
import FavoriteButton from '@/components/FavoriteButton';

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    loadRestaurant();
    loadReviews();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      const response = await fetch(`/api/restaurants/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
      } else {
        // API가 없을 경우 샘플 데이터 사용
        const sampleRestaurant: Restaurant = {
          id,
          name: '제주맛집',
          address: '제주시 연동',
          latitude: 33.4996,
          longitude: 126.5312,
          category: '한식',
          phone: '064-123-4567',
          opening_hours: '10:00 - 22:00',
          price_range: '1만원 - 3만원',
          description: '제주도에서 가장 맛있는 식당입니다.',
        };
        setRestaurant(sampleRestaurant);
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?restaurant_id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        
        if (data.length > 0) {
          const avg = data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length;
          setAverageRating(avg);
        }
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleReviewAdded = () => {
    loadReviews();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">맛집을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← 뒤로가기
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <FavoriteButton restaurantId={restaurant.id} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-semibold">주소:</span> {restaurant.address}
                </p>
                {restaurant.category && (
                  <p className="text-gray-600">
                    <span className="font-semibold">카테고리:</span> {restaurant.category}
                  </p>
                )}
                {restaurant.phone && (
                  <p className="text-gray-600">
                    <span className="font-semibold">전화:</span> {restaurant.phone}
                  </p>
                )}
                {restaurant.opening_hours && (
                  <p className="text-gray-600">
                    <span className="font-semibold">운영시간:</span> {restaurant.opening_hours}
                  </p>
                )}
                {restaurant.price_range && (
                  <p className="text-gray-600">
                    <span className="font-semibold">가격대:</span> {restaurant.price_range}
                  </p>
                )}
              </div>

              {averageRating > 0 && (
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    평점: {averageRating.toFixed(1)} / 5.0
                  </p>
                </div>
              )}
            </div>

            {restaurant.description && (
              <div>
                <h3 className="font-semibold mb-2">소개</h3>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">리뷰</h2>
          <ReviewForm restaurantId={id} onReviewAdded={handleReviewAdded} />
          
          <div className="mt-6 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500">아직 리뷰가 없습니다.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">사용자</span>
                      <span className="text-yellow-500">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                    </div>
                    {review.created_at && (
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


