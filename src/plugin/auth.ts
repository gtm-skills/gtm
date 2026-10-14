import 'server-only';
import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { hasAllAccess, hasSkillAccess } from '@/lib/entitlements';
import { FREE_CAPS } from './frameworks';

export interface PluginIdentity {
  userId: string | null;
  email: string | null;
  /** Active bundle or Pro. Unlimited tools + premium playbooks. */
  allAccess: boolean;
  /** Hash used for anonymous metering. */
  anonKey: string;
}

/**
 * Resolve the caller. ChatGPT sends `Authorization: Bearer <supabase access token>`
 * once the user has linked their account (Supabase Auth acts as the OAuth 2.1 server).
 * Unauthenticated calls are allowed for free tools, metered by a hashed client key.
 */
export async function resolveIdentity(req: Request): Promise<PluginIdentity> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? 'unknown';
  const anonKey = createHash('sha256').update(`anon:${ip}`).digest('hex').slice(0, 32);

  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return { userId: null, email: null, allAccess: false, anonKey };

  const admin = createAdminClient();
  if (!admin) return { userId: null, email: null, allAccess: false, anonKey };
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return { userId: null, email: null, allAccess: false, anonKey };

  const allAccess = await hasAllAccess(data.user.id);
  return { userId: data.user.id, email: data.user.email ?? null, allAccess, anonKey: `user:${data.user.id}` };
}

export async function canUseSkill(id: PluginIdentity, slug: string) {
  if (id.allAccess) return true;
  return hasSkillAccess(id.userId, slug);
}

export interface MeterResult {
  allowed: boolean;
  used: number;
  cap: number | null;
}

/** Enforce daily free caps. All-access users are never metered. */
export async function meter(id: PluginIdentity, tool: string): Promise<MeterResult> {
  if (id.allAccess) return { allowed: true, used: 0, cap: null };
  const cap = FREE_CAPS[tool] ?? null;
  if (cap == null) return { allowed: true, used: 0, cap: null };
  const db = createAdminClient();
  if (!db) return { allowed: true, used: 0, cap }; // fail open when DB is down
  const { data } = await db.rpc('bump_plugin_usage', {
    p_user_id: id.userId,
    p_anon_key: id.userId ? null : id.anonKey,
    p_tool: tool,
  });
  const used = typeof data === 'number' ? data : 1;
  return { allowed: used <= cap, used, cap };
}

export const PLANS_URL = 'https://gtm-skills.com/pricing';
export const LOGIN_HINT = 'Sign in to GTM Skills from the plugin menu to use your plan.';

export function capMessage(id: PluginIdentity, m: MeterResult) {
  const who = id.userId ? 'Your free plan' : 'The free tier';
  return `${who} allows ${m.cap} of these per day and you have used ${m.used - 1}. ${
    id.userId ? `Plans are described at ${PLANS_URL}.` : `${LOGIN_HINT} Plans are described at ${PLANS_URL}.`
  }`;
}
