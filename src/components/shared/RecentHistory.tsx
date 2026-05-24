import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHistoryStore } from "@/stores/history.store";

interface RecentHistoryProps {
  filterCategory?: string;
  onRecall?: (input: string) => void;
  limit?: number;
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ts).toLocaleDateString();
}

export function RecentHistory({ filterCategory, onRecall, limit = 5 }: RecentHistoryProps): JSX.Element {
  const entries = useHistoryStore((s) => s.entries);
  const clear = useHistoryStore((s) => s.clear);

  const filtered = (filterCategory ? entries.filter((e) => e.category === filterCategory) : entries).slice(0, limit);

  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <History className="h-4 w-4 text-muted-foreground" />
          Recent
        </CardTitle>
        {entries.length > 0 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={clear}
            aria-label="Clear history"
            className="h-7 w-7"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        {filtered.length === 0 ? (
          <p className="py-3 text-xs text-muted-foreground">No recent operations yet.</p>
        ) : (
          <ul className="space-y-1">
            {filtered.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onRecall?.(e.input)}
                  disabled={!onRecall}
                  className="group flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent disabled:cursor-default disabled:hover:bg-transparent"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="font-medium">{e.tool}</span>
                    <span className="text-[10px] text-muted-foreground">{formatTime(e.timestamp)}</span>
                  </span>
                  <span className="line-clamp-1 w-full font-mono text-[11px] text-muted-foreground">
                    {e.input || "(empty)"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
