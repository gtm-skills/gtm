import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-zinc-800 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/industry">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Prompts
            </Button>
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link href="/industry" className="text-orange-400 hover:underline">Industries</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/role" className="text-orange-400 hover:underline">Roles</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/methodology" className="text-orange-400 hover:underline">Methodologies</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/agentic-bdr" className="text-orange-400 hover:underline">Agentic BDR</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
