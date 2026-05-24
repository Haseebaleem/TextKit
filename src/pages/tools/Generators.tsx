import { useEffect, useState } from "react";
import { Key, RefreshCw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { ToolSection } from "@/components/shared/ToolSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  generateLoremParagraphs,
  generateLoremWords,
  generateRandomString,
  generateSlug,
  passwordStrength,
  type PasswordStrength,
} from "@/lib/text-utils";

function LoremSection(): JSX.Element {
  const [mode, setMode] = useState<"words" | "paragraphs">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = (): void => {
    const out = mode === "words" ? generateLoremWords(count) : generateLoremParagraphs(count);
    setOutput(out);
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToolSection id="lorem" title="Lorem Ipsum" description="Placeholder text in classic lorem flavor.">
      <div className="flex flex-wrap items-end gap-3">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
            <TabsTrigger value="words">Words</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Label htmlFor="lorem-count" className="text-xs text-muted-foreground">
            Count
          </Label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            max={mode === "words" ? 500 : 20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-20"
          />
        </div>
        <Button onClick={generate} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Generate
        </Button>
      </div>
      <ResultPanel value={output} rows={8} />
    </ToolSection>
  );
}

function SlugSection(): JSX.Element {
  const [input, setInput] = useState("Hello World! This is my first post.");
  const slug = generateSlug(input);
  return (
    <ToolSection id="slug" title="Slug" description="URL-friendly version of any string.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug-input">Source text</Label>
          <Input
            id="slug-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your headline…"
          />
          <p className="text-xs text-muted-foreground">
            Diacritics are stripped, spaces become hyphens, and non-URL-safe characters are
            removed.
          </p>
        </div>
        <ResultPanel value={slug} rows={3} emptyText="Slug will appear here…" />
      </div>
    </ToolSection>
  );
}

interface RandomConfig {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}

function RandomSection(): JSX.Element {
  const [cfg, setCfg] = useState<RandomConfig>({
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  });
  const [output, setOutput] = useState("");

  const generate = (): void => setOutput(generateRandomString(cfg));

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key: keyof RandomConfig) => (v: boolean) =>
    setCfg((prev) => ({ ...prev, [key]: v }));

  return (
    <ToolSection id="random" title="Random String" description="Configurable charset, fixed length.">
      <div className="flex items-center gap-4">
        <Label htmlFor="rnd-len" className="text-xs">
          Length: <span className="font-mono">{cfg.length}</span>
        </Label>
        <Slider
          id="rnd-len"
          min={4}
          max={128}
          value={cfg.length}
          onChange={(e) => setCfg({ ...cfg, length: Number(e.target.value) })}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {(["upper", "lower", "numbers", "symbols"] as const).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <Switch checked={cfg[k]} onCheckedChange={toggle(k)} />
            <span className="capitalize">{k}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={generate} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Generate
        </Button>
      </div>
      <ResultPanel value={output} rows={3} />
    </ToolSection>
  );
}

const STRENGTH_META: Record<PasswordStrength, { label: string; pct: number; color: string }> = {
  "very-weak": { label: "Very weak", pct: 15, color: "bg-red-500" },
  weak: { label: "Weak", pct: 35, color: "bg-orange-500" },
  fair: { label: "Fair", pct: 55, color: "bg-yellow-500" },
  strong: { label: "Strong", pct: 80, color: "bg-green-500" },
  "very-strong": { label: "Very strong", pct: 100, color: "bg-emerald-500" },
};

function PasswordSection(): JSX.Element {
  const [cfg, setCfg] = useState<RandomConfig>({
    length: 20,
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [output, setOutput] = useState("");

  const generate = (): void => setOutput(generateRandomString(cfg));

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strength = passwordStrength(output);
  const meta = STRENGTH_META[strength];

  const toggle = (key: keyof RandomConfig) => (v: boolean) =>
    setCfg((prev) => ({ ...prev, [key]: v }));

  return (
    <ToolSection id="password" title="Password" description="Strong random password with charset toggles.">
      <div className="flex items-center gap-4">
        <Label htmlFor="pw-len" className="text-xs">
          Length: <span className="font-mono">{cfg.length}</span>
        </Label>
        <Slider
          id="pw-len"
          min={8}
          max={64}
          value={cfg.length}
          onChange={(e) => setCfg({ ...cfg, length: Number(e.target.value) })}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {(["upper", "lower", "numbers", "symbols"] as const).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <Switch checked={cfg[k]} onCheckedChange={toggle(k)} />
            <span className="capitalize">{k}</span>
          </label>
        ))}
      </div>
      <div>
        <Button onClick={generate} className="gap-2">
          <Key className="h-4 w-4" /> Generate password
        </Button>
      </div>
      <ResultPanel value={output} rows={2} />
      {output ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Strength</span>
            <Badge variant="outline">{meta.label}</Badge>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className={`h-full ${meta.color}`} style={{ width: `${meta.pct}%` }} />
          </div>
        </div>
      ) : null}
    </ToolSection>
  );
}

export function Generators(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Generators"
        description="Lorem ipsum, URL slugs, random strings, and secure passwords."
        icon={Sparkles}
      />
      <div className="space-y-6">
        <LoremSection />
        <SlugSection />
        <RandomSection />
        <PasswordSection />
      </div>
    </div>
  );
}
