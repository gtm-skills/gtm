import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';

/** slug → install count. Empty when DB is unavailable. */
export async function getInstallCounts(): Promise<Record<string, number>> {
  const db = createAdminClient();
  if (!db) return {};
  const { data } = await db.from('skill_install_counts').select('skill_slug, installs');
  return Object.fromEntries((data ?? []).map((r) => [r.skill_slug as string, r.installs as number]));
}
