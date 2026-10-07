import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

/** Colored tile with a lucide icon. Hue comes from the catalog so every surface agrees. */
export function SkillIcon({ name, hue, size = 'md', className = '' }: { name: string; hue: number; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const Icon = ((Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Sparkles);
  const dims = size === 'sm' ? 'h-9 w-9 rounded-lg' : size === 'lg' ? 'h-20 w-20 rounded-2xl' : 'h-12 w-12 rounded-xl';
  const icon = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-9 w-9' : 'h-6 w-6';
  return (
    <div
      className={`${dims} flex items-center justify-center shrink-0 ${className}`}
      style={{
        background: `oklch(0.78 0.11 ${hue})`,
        color: `oklch(0.22 0.06 ${hue})`,
      }}
      aria-hidden="true"
    >
      <Icon className={icon} strokeWidth={1.75} />
    </div>
  );
}
