import { NextResponse } from 'next/server';

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


