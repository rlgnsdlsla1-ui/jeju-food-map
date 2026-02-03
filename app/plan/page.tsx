'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant, RoutePlan } from '@/lib/types';
import { getCurrentUser } from '@/lib/firebase-auth';
import Map from '@/components/Map';

export default function PlanPage() {
  const router = useRouter();
  const [planName, setPlanName] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([]);
  const [savedPlans, setSavedPlans] = useState<RoutePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadSavedPlans();
  }, []);

  const checkAuth = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        router.push('/login');
      }
    } catch (error) {
      // Firebase가 설정되지 않은 경우 무시
    }
  };

  const loadSavedPlans = async () => {
    try {
      // TODO: 실제 API에서 저장된 계획 가져오기
      setSavedPlans([]);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      alert('계획 이름을 입력해주세요.');
      return;
    }

    try {
      const user = getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // TODO: 실제 API 호출
      // const response = await fetch('/api/route-plans', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: user.uid,
      //     name: planName,
      //     restaurants: selectedRestaurants.map(r => r.id),
      //   }),
      // });

      alert('여행 계획이 저장되었습니다.');
      setPlanName('');
      setSelectedRestaurants([]);
      loadSavedPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('계획 저장에 실패했습니다.');
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
        <h1 className="text-3xl font-bold mb-6">여행 계획</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">새 여행 계획</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계획 이름
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="예: 제주도 3일 여행"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">선택한 맛집</h3>
              {selectedRestaurants.length === 0 ? (
                <p className="text-gray-500">맛집을 선택해주세요.</p>
              ) : (
                <ul className="space-y-2">
                  {selectedRestaurants.map((restaurant) => (
                    <li key={restaurant.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{restaurant.name}</span>
                      <button
                        onClick={() => setSelectedRestaurants(prev => prev.filter(r => r.id !== restaurant.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        제거
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSavePlan}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              계획 저장
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">저장된 계획</h2>
            {savedPlans.length === 0 ? (
              <p className="text-gray-500">저장된 계획이 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {savedPlans.map((plan) => (
                  <li key={plan.id} className="p-3 border rounded hover:bg-gray-50">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-sm text-gray-600">
                      {plan.restaurants.length}개의 맛집
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">지도에서 맛집 선택</h2>
          <div className="h-96">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}


