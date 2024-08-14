import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const defaultLocale = 'zh-TW';
const locales = [defaultLocale, 'zh-CH', 'en-US'];

const localeMapping: Record<string, string> = {
  'zh-TW': 'tw',
  'zh-CH': 'cn',
  'en-US': 'en',
};

function getLocale(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  const negotiator = new Negotiator({ headers });
  let languages = negotiator.languages();

  if (languages.length === 1 && languages[0] === '*') {
    languages = [defaultLocale];
  }

  const locale = match(languages, locales, defaultLocale);
  return localeMapping[locale] || 'tw';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip images and other static assets
  const imageRegex = /\.(png|svg|jpg|jpeg|webp)$/i;
  if (imageRegex.test(pathname)) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const pathnameStartsWithLocale = pathname.startsWith(`/${locale}`);

  // assign pathname with modified URL
  if (!pathnameStartsWithLocale) {
    request.nextUrl.pathname = pathname === '/'
      ? `/${locale}`
      : `/${locale}${pathname}`
  }

  // Redirect to the modified URL or proceed if no modification was needed
  if (request.nextUrl.pathname !== pathname) {
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    * - netronAdmin (dashboard)
    */
    '/((?!_next|_next/static|_next/image|favicon.ico|api|netronAdmin).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
