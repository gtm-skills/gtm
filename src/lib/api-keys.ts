import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';

const PREFIX = 'gsk_live_';

export function hashKey(key: string) {
  return createHash('sha256').update(key).digest('hex');
}

/** Returns the plaintext key once. Only the hash is stored. */
export async function createApiKey(userId: string, label?: string) {
  const db = createAdminClient();
  if (!db) throw new Error('database unavailable');
  const secret = randomBytes(24).toString('base64url');
  const key = `${PREFIX}${secret}`;
  const prefix = key.slice(0, PREFIX.length + 4);
  const { data, error } = await db
    .from('api_keys')
    .insert({ user_id: userId, prefix, key_hash: hashKey(key), label: label ?? 'default' })
    .select('id, prefix, label, created_at')
    .single();
  if (error) throw error;
  return { key, row: data };
}

export async function revokeApiKey(userId: string, id: string) {
  const db = createAdminClient();
  if (!db) return;
  await db.from('api_keys').update({ revoked_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId);
}

export async function listApiKeys(userId: string) {
  const db = createAdminClient();
  if (!db) return [];
  const { data } = await db
    .from('api_keys')
    .select('id, prefix, label, last_used_at, created_at')
    .eq('user_id', userId)
    .is('revoked_at', null)
    .order('created_at', { ascending: false });
  return data ?? [];
}

/** Resolve a Bearer key to a user id; bumps last_used_at. */
export async function userIdFromApiKey(key: string): Promise<string | null> {
  if (!key.startsWith(PREFIX)) return null;
  const db = createAdminClient();
  if (!db) return null;
  const { data } = await db
    .from('api_keys')
    .select('id, user_id')
    .eq('key_hash', hashKey(key))
    .is('revoked_at', null)
    .maybeSingle();
  if (!data) return null;
  void db.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', data.id);
  return data.user_id as string;
}
