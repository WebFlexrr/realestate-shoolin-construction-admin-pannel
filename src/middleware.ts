import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken');

	if (!accessToken?.value) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/enquiry', '/project', '/'],
};
