import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurant_id');

    // TODO: 실제 Firestore에서 리뷰 가져오기
    return NextResponse.json([]);
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
    // TODO: 실제 Firestore에 리뷰 저장
    return NextResponse.json({ ...body, id: Date.now().toString() });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


