'use client';

import { useState, useEffect } from 'react';
import KakaoMap from '@/components/KakaoMap';
import RegionFilter from '@/components/RegionFilter';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/lib/types';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const filteredRestaurants = selectedRegion === '전체'
    ? restaurants
    : restaurants.filter(r => r.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 헤더 섹션 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍊 제주도 맛집 지도
          </h1>
          <p className="text-gray-600">
            제주도의 숨은 맛집을 찾아보세요
          </p>
        </div>

        {/* 지역 필터 */}
        <div className="mb-6">
          <RegionFilter
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>

        {/* 보기 모드 전환 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🗺️ 지도보기
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📋 목록보기
            </button>
          </div>

          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            {loading ? (
              '로딩 중...'
            ) : (
              <>총 <span className="font-semibold text-blue-600">{filteredRestaurants.length}</span>개의 맛집</>
            )}
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">맛집 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {viewMode === 'map' ? (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* 지도 */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
                    <KakaoMap
                      restaurants={filteredRestaurants}
                      selectedRegion={selectedRegion}
                      onMarkerClick={handleMarkerClick}
                    />
                  </div>
                </div>

                {/* 선택된 맛집 정보 */}
                <div className="lg:col-span-1">
                  {selectedRestaurant ? (
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedRestaurant.name}
                      </h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            {selectedRestaurant.category}
                          </span>
                          <span className="text-gray-600">
                            ⭐ {selectedRestaurant.rating?.toFixed(1) || '평가없음'}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{selectedRestaurant.address}</span>
                        </div>
                        {selectedRestaurant.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{selectedRestaurant.phone}</span>
                          </div>
                        )}
                        {selectedRestaurant.operating_hours && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{selectedRestaurant.operating_hours}</span>
                          </div>
                        )}
                      </div>
                      <a
                        href={`/restaurant/${selectedRestaurant.id}`}
                        className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        상세보기
                      </a>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center sticky top-6">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 mb-2 font-medium">
                        맛집을 선택해주세요
                      </p>
                      <p className="text-sm text-gray-500">
                        지도의 마커를 클릭하면<br />
                        상세 정보를 확인할 수 있습니다
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* 목록 보기 */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.length === 0 ? (
                  <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-600 mb-2 font-medium">
                      맛집 정보가 없습니다
                    </p>
                    <p className="text-sm text-gray-500">
                      관리자가 맛집을 등록하면 여기에 표시됩니다
                    </p>
                  </div>
                ) : (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
