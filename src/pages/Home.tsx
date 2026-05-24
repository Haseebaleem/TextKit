import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TOOLS } from "@/lib/tool-registry";
import { RecentHistory } from "@/components/shared/RecentHistory";

export function Home(): JSX.Element {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="mb-10 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-8">
        <Badge variant="outline" className="mb-3 gap-1.5 border-primary/30 text-primary">
          <Sparkles className="h-3 w-3" /> {TOOLS.length} utilities in one place
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A developer text toolbox you'll actually keep open.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Case conversion, encoding, JSON formatting, diffing, slug generation and more — all
          running locally in your browser, no data ever leaves your machine.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/tools/transformations">
              Start with transformations <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/about">About TextKit</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const tools = TOOLS.filter((t) => t.category.id === cat.id);
              return (
                <Link key={cat.id} to={cat.path} className="group">
                  <Card className="h-full transition-colors hover:border-primary/40 hover:bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base group-hover:text-primary">
                          {cat.name}
                        </CardTitle>
                      </div>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-1.5">
                      {tools.map((t) => (
                        <Badge key={t.id} variant="secondary" className="font-normal">
                          {t.name}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        <aside className="space-y-4">
          <RecentHistory />
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Keyboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Jump to tool</span>
                <kbd className="rounded border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Copy result</span>
                <kbd className="rounded border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  click copy
                </kbd>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
