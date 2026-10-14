import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/** Content repo push webhook → bust cached skill files. POST /api/revalidate?secret=…&slug=… (slug optional) */
export async function POST(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('secret') !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const slug = url.searchParams.get('slug');
  const { getAllSkillSlugs } = await import('@/data/skills');
  const slugs = slug ? [slug] : getAllSkillSlugs();
  slugs.forEach((s) => revalidateTag(`skill:${s}`, 'max'));
  return NextResponse.json({ revalidated: slugs });
}
