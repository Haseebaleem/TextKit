import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function About(): JSX.Element {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">About TextKit</h1>
      <p className="mt-2 text-muted-foreground">
        A modern, developer-focused text utility suite. All operations run client-side — your text
        never leaves the browser.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Project origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            TextKit began as a learning exercise — a basic text utility app built while following
            Code with Harry's React tutorial series in 2023, when I was deepening my React
            fundamentals after several years of full-stack work. The original implementation covered
            five operations (uppercase, lowercase, clear, copy, whitespace cleanup) and basic text
            statistics.
          </p>
          <p>
            In 2026 I rebuilt it from scratch as TextKit — a comprehensive developer-focused suite
            with 15+ utilities across five categories, a modern Tailwind + shadcn/ui design, and a
            comprehensive test suite for all the pure utility functions.
          </p>
          <p className="text-xs italic">
            Learning from quality educators is part of every developer's journey. Rebuilding
            learning projects with production-grade architecture is itself a valuable skill.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Stack</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {[
            "React 18",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "shadcn/ui",
            "Zustand",
            "React Router",
            "Vitest",
          ].map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
