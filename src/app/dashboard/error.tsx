'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center glass-card">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Vyskytla sa neočakávaná chyba</CardTitle>
          <CardDescription>
            Ľutujeme, ale niečo sa pokazilo. Náš tím bol o probléme informovaný.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Môžete skúsiť obnoviť stránku, alebo sa vrátiť neskôr.
          </p>
          <Button onClick={() => reset()}>Obnoviť stránku</Button>
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-xs text-muted-foreground">Technické detaily chyby</summary>
            <pre className="mt-2 w-full overflow-auto rounded-md bg-muted/50 p-4 text-xs text-foreground">
                <code>{error.message}</code>
                {error.digest && <code className="block mt-2 opacity-50">Digest: {error.digest}</code>}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
