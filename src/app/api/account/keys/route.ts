import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/server';
import { createApiKey, listApiKeys, revokeApiKey } from '@/lib/api-keys';

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ keys: await listApiKeys(user.id) });
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { label } = (await req.json().catch(() => ({}))) as { label?: string };
  const { key, row } = await createApiKey(user.id, label);
  return NextResponse.json({ key, row });
}

export async function DELETE(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
  await revokeApiKey(user.id, id);
  return NextResponse.json({ ok: true });
}
