import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const secret = req.nextUrl.searchParams.get('secret');

	if (secret !== process.env.REVALIDATE_SECRET) {
		return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
	}

	try {
		revalidatePath('/realisations');
		revalidatePath('/realisations/[slug]', 'page');
		revalidatePath('/');

		return NextResponse.json({ revalidated: true });
	} catch (e) {
		return NextResponse.json({ revalidated: true });
	}
}
