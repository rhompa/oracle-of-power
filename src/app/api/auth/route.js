import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ACCESS_PASSWORD || 'olympus48';

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'The gates of Olympus remain sealed.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'The fates are displeased.' }, { status: 500 });
  }
}
