import { useEffect, useMemo, useState } from "react";
import { Braces, Code2, Diff, Replace } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TextInput } from "@/components/shared/TextInput";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { ToolSection } from "@/components/shared/ToolSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  computeDiff,
  findReplace,
  formatJson,
  minifyJson,
  validateJson,
  type DiffChange,
} from "@/lib/text-utils";

type JsonMode = "format" | "minify" | "validate";

function JsonSection(): JSX.Element {
  const [mode, setMode] = useState<JsonMode>("format");
  const [input, setInput] = useState('{"hello":"world","arr":[1,2,3]}');

  const result = useMemo(() => {
    if (mode === "format") return formatJson(input);
    if (mode === "minify") return minifyJson(input);
    return validateJson(input);
  }, [mode, input]);

  return (
    <ToolSection
      id="json"
      title="JSON"
      description="Format, minify, or validate JSON. UTF-8 safe."
      actions={
        <Tabs value={mode} onValueChange={(v) => setMode(v as JsonMode)}>
          <TabsList className="h-9">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="minify">Minify</TabsTrigger>
            <TabsTrigger value="validate">Validate</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput value={input} onChange={setInput} label="Input JSON" rows={12} />
        <ResultPanel value={result.ok ? result.value : ""} rows={12} />
      </div>
      {result.ok ? (
        <p className="text-xs text-green-600 dark:text-green-400">
          {mode === "validate" ? result.value : "Valid JSON."}
        </p>
      ) : (
        <p className="text-xs text-destructive">
          {result.error}
          {result.errorPosition
            ? ` (line ${result.errorPosition.line}, col ${result.errorPosition.column})`
            : ""}
        </p>
      )}
    </ToolSection>
  );
}

function FindReplaceSection(): JSX.Element {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [regex, setRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const result = useMemo(
    () => findReplace(input, { find, replace, regex, caseSensitive }),
    [input, find, replace, regex, caseSensitive],
  );

  return (
    <ToolSection id="find-replace" title="Find & Replace" description="With regex and case sensitivity options.">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fr-find">Find</Label>
          <Input
            id="fr-find"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder={regex ? "regular expression…" : "search term…"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fr-replace">Replace with</Label>
          <Input
            id="fr-replace"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="replacement…"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2">
          <Switch checked={regex} onCheckedChange={setRegex} />
          <span>Regex</span>
        </label>
        <label className="flex items-center gap-2">
          <Switch checked={caseSensitive} onCheckedChange={setCaseSensitive} />
          <span>Case sensitive</span>
        </label>
        <Badge variant="secondary" className="ml-auto">
          {result.count} match{result.count === 1 ? "" : "es"}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput value={input} onChange={setInput} label="Input" rows={10} />
        <ResultPanel value={result.error ? "" : result.output} rows={10} />
      </div>
      {result.error ? <p className="text-xs text-destructive">{result.error}</p> : null}
    </ToolSection>
  );
}

function DiffChangeRow({ change }: { change: DiffChange }): JSX.Element {
  const lines = change.value.replace(/\n$/, "").split("\n");
  const cls = change.added
    ? "bg-green-500/10 text-green-700 dark:text-green-300"
    : change.removed
      ? "bg-red-500/10 text-red-700 dark:text-red-300"
      : "text-muted-foreground";
  const prefix = change.added ? "+" : change.removed ? "-" : " ";
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className={`whitespace-pre-wrap px-3 py-0.5 font-mono text-xs ${cls}`}>
          <span className="mr-2 select-none opacity-60">{prefix}</span>
          {line || " "}
        </div>
      ))}
    </>
  );
}

function DiffSection(): JSX.Element {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const changes = useMemo(() => computeDiff(left, right), [left, right]);

  return (
    <ToolSection id="diff" title="Text Diff" description="Line-level diff between two snippets.">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput value={left} onChange={setLeft} label="Original" rows={10} />
        <TextInput value={right} onChange={setRight} label="Changed" rows={10} />
      </div>
      <div className="overflow-hidden rounded-md border border-border/60 bg-muted/30">
        {left || right ? (
          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {changes.map((c, i) => (
              <DiffChangeRow key={i} change={c} />
            ))}
          </div>
        ) : (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            Add text on both sides to see the diff.
          </p>
        )}
      </div>
    </ToolSection>
  );
}

export function Developer(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Developer"
        description="JSON, find & replace, and text diff — the everyday tools."
        icon={Code2}
      />
      <div className="space-y-6">
        <JsonSection />
        <FindReplaceSection />
        <DiffSection />
      </div>
      <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Braces className="h-3 w-3" /> JSON formatter
        </span>
        <span className="inline-flex items-center gap-1">
          <Replace className="h-3 w-3" /> Find/Replace
        </span>
        <span className="inline-flex items-center gap-1">
          <Diff className="h-3 w-3" /> Diff
        </span>
      </div>
    </div>
  );
}
