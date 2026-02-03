import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: 'Firebase가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // TODO: 실제 Firestore에서 데이터 가져오기
    const sampleRestaurant = {
      id: params.id,
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

    return NextResponse.json(sampleRestaurant);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: 'Firebase가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    // TODO: 실제 Firestore 업데이트
    return NextResponse.json(body);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: 'Firebase가 설정되지 않았습니다.' },
        { status: 500 }
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


