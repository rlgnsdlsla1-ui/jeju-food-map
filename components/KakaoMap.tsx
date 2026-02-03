'use client';

import { useEffect, useRef, useState } from 'react';
import { Restaurant } from '@/lib/types';

interface KakaoMapProps {
  restaurants: Restaurant[];
  selectedRegion?: string;
  onMarkerClick?: (restaurant: Restaurant) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ restaurants, selectedRegion, onMarkerClick }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    
    if (!apiKey || apiKey === 'your_kakao_map_api_key' || apiKey === 'your_kakao_map_api_key_here') {
      console.error('❌ 카카오맵 API 키가 설정되지 않았습니다!');
      console.log('📝 .env.local 파일을 확인하세요.');
      console.log('🔗 https://developers.kakao.com 에서 API 키를 발급받으세요.');
      console.log('📖 자세한 내용: KAKAO_MAP_SETUP.md 파일 참조');
      setIsLoaded(false);
      return;
    }

    console.log('✅ 카카오맵 API 키 확인됨:', apiKey.substring(0, 10) + '...');

    if (window.kakao && window.kakao.maps) {
      console.log('✅ 카카오맵 이미 로드됨');
      setIsLoaded(true);
      return;
    }

    console.log('⏳ 카카오맵 스크립트 로딩 시작...');
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      console.log('✅ 카카오맵 스크립트 로드 완료');
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log('✅ 카카오맵 초기화 완료');
          setIsLoaded(true);
        });
      } else {
        console.error('❌ 카카오맵 객체를 찾을 수 없습니다');
      }
    };
    
    script.onerror = (error) => {
      console.error('❌ 카카오맵 스크립트 로드 실패:', error);
      console.log('🔧 확인 사항:');
      console.log('1. 카카오 개발자 콘솔(https://developers.kakao.com)에서 플랫폼 도메인 등록 확인');
      console.log('2. http://localhost:3000 이 등록되어 있는지 확인');
      console.log('3. API 키가 유효한지 확인');
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const options = {
      center: new window.kakao.maps.LatLng(33.3846, 126.5535), // 제주도 중심
      level: 9, // 전체 제주도가 보이는 레벨
    };

    const newMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(newMap);

    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }, [isLoaded, map]);

  // 마커 업데이트
  useEffect(() => {
    if (!map || !isLoaded) return;

    // 기존 마커 제거
    markers.forEach((marker: any) => marker.setMap(null));

    // 지역별 필터링
    const filteredRestaurants = selectedRegion && selectedRegion !== '전체'
      ? restaurants.filter(r => r.region === selectedRegion)
      : restaurants;

    // 새 마커 생성
    const newMarkers = filteredRestaurants.map(restaurant => {
      const markerPosition = new window.kakao.maps.LatLng(
        restaurant.latitude,
        restaurant.longitude
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: restaurant.name,
      });

      marker.setMap(map);

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (onMarkerClick) {
          onMarkerClick(restaurant);
        }

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">
                ${restaurant.name}
              </h3>
              <p style="margin: 0; font-size: 12px; color: #666;">
                ${restaurant.category}
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
                ⭐ ${restaurant.rating?.toFixed(1) || '평가없음'}
              </p>
            </div>
          `,
        });

        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // 마커가 있으면 해당 영역으로 지도 범위 조정
    if (newMarkers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      filteredRestaurants.forEach(restaurant => {
        bounds.extend(
          new window.kakao.maps.LatLng(restaurant.latitude, restaurant.longitude)
        );
      });
      map.setBounds(bounds);
    }
  }, [map, restaurants, selectedRegion, isLoaded]);

  if (!isLoaded) {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    const isKeyMissing = !apiKey || apiKey === 'your_kakao_map_api_key' || apiKey === 'your_kakao_map_api_key_here';
    
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md p-6">
          {isKeyMissing ? (
            <>
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                카카오맵 API 키가 필요합니다
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                지도를 표시하려면 카카오맵 API 키를 설정해야 합니다.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left text-sm">
                <p className="font-semibold text-blue-900 mb-2">설정 방법:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>developers.kakao.com 접속</li>
                  <li>애플리케이션 생성</li>
                  <li>JavaScript 키 복사</li>
                  <li>.env.local 파일에 키 입력</li>
                  <li>개발 서버 재시작</li>
                </ol>
                <p className="mt-3 text-xs text-blue-700">
                  📖 자세한 내용: KAKAO_MAP_SETUP.md
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">지도 로딩 중...</p>
              <p className="text-xs text-gray-500 mt-2">
                잠시만 기다려주세요
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
      
      {/* 범례 */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 z-10">
        <h3 className="font-semibold text-sm mb-2">지도 안내</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <p>📍 마커 클릭 시 상세 정보 표시</p>
          <p>🔍 마우스 휠로 확대/축소</p>
          <p>✋ 드래그로 이동</p>
        </div>
        {selectedRegion && selectedRegion !== '전체' && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs font-semibold text-blue-600">
              📌 {selectedRegion} 지역
            </p>
          </div>
        )}
      </div>

      {/* 맛집 개수 표시 */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 z-10">
        <p className="text-sm font-semibold text-gray-700">
          총 {markers.length}개의 맛집
        </p>
      </div>
    </div>
  );
}

