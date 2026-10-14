import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSkill, getKitForSkill, kits, type ProductId } from '@/data/skills';

export interface ProductRow {
  id: ProductId;
  name: string;
  kind: 'kit' | 'bundle' | 'subscription' | 'skill';
  price_cents: number;
  interval: 'month' | 'year' | null;
  stripe_price_id: string | null;
  stripe_launch_price_id: string | null;
  launch_price_cents: number | null;
  launch_seat_limit: number | null;
  active: boolean;
}

export async function getProducts(): Promise<ProductRow[]> {
  const db = createAdminClient();
  if (!db) return [];
  const { data } = await db.from('products').select('*').eq('active', true).order('sort');
  return (data ?? []) as ProductRow[];
}

export async function getProduct(id: ProductId): Promise<ProductRow | null> {
  const db = createAdminClient();
  if (!db) return null;
  const { data } = await db.from('products').select('*').eq('id', id).maybeSingle();
  return (data as ProductRow | null) ?? null;
}

/** Launch seats already sold for a product (0 when DB is unavailable). */
export async function launchSeatsTaken(productId: ProductId): Promise<number> {
  const db = createAdminClient();
  if (!db) return 0;
  const { data } = await db.rpc('launch_seats_taken', { p_product_id: productId });
  return typeof data === 'number' ? data : 0;
}

export interface LaunchState {
  limit: number;
  taken: number;
  left: number;
  active: boolean;
}

export async function getLaunchState(productId: ProductId = 'full-bundle'): Promise<LaunchState> {
  const kit = kits.find((k) => k.id === productId);
  const limit = kit?.launchSeatLimit ?? 0;
  if (!limit) return { limit: 0, taken: 0, left: 0, active: false };
  const taken = await launchSeatsTaken(productId);
  const left = Math.max(0, limit - taken);
  return { limit, taken, left, active: left > 0 };
}

/** Can this user read/install this skill? Free skills are always true. */
export async function hasSkillAccess(userId: string | null, slug: string): Promise<boolean> {
  const skill = getSkill(slug);
  if (!skill) return false;
  if (skill.tier === 'free') return true;
  if (!userId) return false;
  const db = createAdminClient();
  if (!db) return false;
  const { data } = await db.rpc('has_skill_access', { uid: userId, slug });
  return data === true;
}

export async function hasAllAccess(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const db = createAdminClient();
  if (!db) return false;
  const { data } = await db.rpc('has_all_access', { uid: userId });
  return data === true;
}

export interface EntitlementRow {
  product_id: ProductId;
  source: 'purchase' | 'subscription' | 'grant';
  expires_at: string | null;
}

export async function getEntitlements(userId: string): Promise<EntitlementRow[]> {
  const db = createAdminClient();
  if (!db) return [];
  const { data } = await db
    .from('entitlements')
    .select('product_id, source, expires_at')
    .eq('user_id', userId)
    .is('revoked_at', null);
  const now = Date.now();
  return ((data ?? []) as EntitlementRow[]).filter((e) => !e.expires_at || new Date(e.expires_at).getTime() > now);
}

/** Which product should we send a locked-out user to buy for this skill? */
export function upsellFor(slug: string) {
  const kit = getKitForSkill(slug);
  return { kit: kit?.id ?? 'full-bundle', pro: 'pro' as const };
}
