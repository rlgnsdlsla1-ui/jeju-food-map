import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const restaurantId = searchParams.get('restaurant_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      );
    }

    // TODO: 실제 Firestore에서 즐겨찾기 가져오기
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
    // TODO: 실제 Firestore에 즐겨찾기 저장
    return NextResponse.json({ ...body, id: Date.now().toString() });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: 'Firebase가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const restaurantId = searchParams.get('restaurant_id');

    if (!userId || !restaurantId) {
      return NextResponse.json(
        { error: 'user_id and restaurant_id are required' },
        { status: 400 }
      );
    }

    // TODO: 실제 Firestore 삭제
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


