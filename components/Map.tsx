'use client';

import { useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript, getJejuCenter } from '@/lib/kakao-map';
import { Restaurant } from '@/lib/types';
import RestaurantCard from './RestaurantCard';

const JEJU_REGIONS = [
  { value: '', label: '전체' },
  { value: '제주시', label: '제주시' },
  { value: '서귀포시', label: '서귀포시' },
  { value: '애월', label: '애월' },
  { value: '중문', label: '중문' },
  { value: '성산', label: '성산' },
  { value: '한림', label: '한림' },
];

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadKakaoMapScript();
        
        if (mapRef.current && !map) {
          const center = getJejuCenter();
          const options = {
            center,
            level: 9,
          };
          
          const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(kakaoMap);
          
          // 지도 컨트롤 추가
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          kakaoMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
          
          const zoomControl = new window.kakao.maps.ZoomControl();
          kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        }
      } catch (error) {
        console.error('지도 초기화 실패:', error);
        setLoading(false);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = restaurants.filter((r) =>
        r.address.includes(selectedRegion)
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [selectedRegion, restaurants]);

  const loadRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      } else {
        // API가 없을 경우 샘플 데이터 사용
        const sampleRestaurants: Restaurant[] = [
          {
            id: '1',
            name: '제주맛집 1',
            address: '제주시 연동',
            latitude: 33.4996,
            longitude: 126.5312,
            category: '한식',
          },
          {
            id: '2',
            name: '제주맛집 2',
            address: '서귀포시 중문',
            latitude: 33.2394,
            longitude: 126.4094,
            category: '일식',
          },
        ];
        setRestaurants(sampleRestaurants);
      }
    } catch (error) {
      console.error('Error loading restaurants:', error);
      // 에러 시 샘플 데이터 사용
      const sampleRestaurants: Restaurant[] = [
        {
          id: '1',
          name: '제주맛집 1',
          address: '제주시 연동',
          latitude: 33.4996,
          longitude: 126.5312,
          category: '한식',
        },
        {
          id: '2',
          name: '제주맛집 2',
          address: '서귀포시 중문',
          latitude: 33.2394,
          longitude: 126.4094,
          category: '일식',
        },
      ];
      setRestaurants(sampleRestaurants);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!map || filteredRestaurants.length === 0) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    filteredRestaurants.forEach((restaurant) => {
      const position = new window.kakao.maps.LatLng(
        restaurant.latitude,
        restaurant.longitude
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position,
        map,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedRestaurant(restaurant);
        map.panTo(position);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // 모든 마커가 보이도록 지도 범위 조정
    if (newMarkers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      filteredRestaurants.forEach((restaurant) => {
        bounds.extend(
          new window.kakao.maps.LatLng(restaurant.latitude, restaurant.longitude)
        );
      });
      map.setBounds(bounds);
    }
  }, [map, filteredRestaurants]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-xl">지도를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {JEJU_REGIONS.map((region) => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
          ))}
        </select>
      </div>
      <div ref={mapRef} className="w-full h-full" />
      {selectedRestaurant && (
        <div className="absolute top-4 left-4 z-10 max-w-sm w-full">
          <RestaurantCard
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </div>
  );
}


