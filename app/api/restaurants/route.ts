import { NextResponse } from 'next/server';
import { sampleRestaurants } from '@/lib/sample-restaurants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region');
    const search = searchParams.get('search');

    // TODO: 실제 Firestore에서 데이터 가져오기
    // 현재는 샘플 데이터 반환
    let filteredRestaurants = [...sampleRestaurants];

    // 카테고리 필터
    if (category && category !== '전체') {
      filteredRestaurants = filteredRestaurants.filter(
        r => r.category === category
      );
    }

    // 지역 필터
    if (region && region !== '전체') {
      filteredRestaurants = filteredRestaurants.filter(
        r => r.region === region
      );
    }

    // 검색어 필터
    if (search) {
      const searchLower = search.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(
        r => 
          r.name.toLowerCase().includes(searchLower) ||
          r.address.toLowerCase().includes(searchLower) ||
          r.description?.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(filteredRestaurants);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: 'Firebase가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    // TODO: 실제 Firestore에 데이터 저장
    return NextResponse.json(body);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


