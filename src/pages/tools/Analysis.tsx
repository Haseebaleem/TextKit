import { useMemo, useState } from "react";
import {
  ChartBar,
  Clock,
  Hash,
  Keyboard,
  Layers,
  Type,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TextInput } from "@/components/shared/TextInput";
import { StatsCard } from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { characterFrequency, computeStats, wordFrequency } from "@/lib/text-utils";

function formatMinutes(mins: number): string {
  if (mins < 1 / 60) return "0s";
  if (mins < 1) {
    return `${Math.round(mins * 60)}s`;
  }
  const m = Math.floor(mins);
  const s = Math.round((mins - m) * 60);
  return s ? `${m}m ${s}s` : `${m}m`;
}

function FrequencyList({
  title,
  data,
  emptyText,
}: {
  title: string;
  data: Array<[string, number]>;
  emptyText: string;
}): JSX.Element {
  const max = data[0]?.[1] ?? 1;
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-2 text-sm text-muted-foreground">{emptyText}</p>
        ) : (
          <ul className="space-y-1.5">
            {data.map(([key, count]) => (
              <li key={key} className="flex items-center gap-3 text-sm">
                <span className="w-24 truncate font-mono text-xs">{key}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function Analysis(): JSX.Element {
  const [input, setInput] = useState("");
  const debounced = useDebouncedValue(input, 100);

  const stats = useMemo(() => computeStats(debounced), [debounced]);
  const words = useMemo(() => wordFrequency(debounced, 10), [debounced]);
  const chars = useMemo(() => characterFrequency(debounced, 10), [debounced]);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Analysis"
        description="Live statistics, reading time, and frequency charts that update as you type."
        icon={ChartBar}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div id="stats">
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Text</CardTitle>
            </CardHeader>
            <CardContent>
              <TextInput value={input} onChange={setInput} rows={14} />
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <FrequencyList
              title="Top words"
              data={words}
              emptyText="Type something to see word frequency."
            />
            <FrequencyList
              title="Top characters"
              data={chars}
              emptyText="Type something to see character frequency."
            />
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-3">
            <StatsCard label="Characters" value={stats.characters} icon={Type} />
            <StatsCard
              label="No spaces"
              value={stats.charactersNoSpaces}
              icon={Type}
            />
            <StatsCard label="Words" value={stats.words} icon={Hash} />
            <StatsCard label="Sentences" value={stats.sentences} icon={Hash} />
            <StatsCard label="Paragraphs" value={stats.paragraphs} icon={Layers} />
            <StatsCard label="Lines" value={stats.lines} icon={Layers} />
            <StatsCard
              label="Reading"
              value={formatMinutes(stats.readingTimeMin)}
              hint="200 wpm"
              icon={Clock}
            />
            <StatsCard
              label="Speaking"
              value={formatMinutes(stats.speakingTimeMin)}
              hint="130 wpm"
              icon={Keyboard}
            />
            <StatsCard
              label="Avg word"
              value={stats.avgWordLength.toFixed(1)}
              hint="characters"
              icon={Type}
              className="col-span-2"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
