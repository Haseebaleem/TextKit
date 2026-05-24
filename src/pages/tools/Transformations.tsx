import { useEffect, useMemo, useState } from "react";
import { Wand2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TextInput } from "@/components/shared/TextInput";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { ToolSection } from "@/components/shared/ToolSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useHistoryStore } from "@/stores/history.store";
import {
  removeAllWhitespace,
  removeDuplicateLines,
  removeExtraSpaces,
  reverseLines,
  reverseText,
  reverseWords,
  shuffleLines,
  sortLines,
  toCamelCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toScreamingSnakeCase,
  toSentenceCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
  trimEachLine,
} from "@/lib/text-utils";

interface ActionDef {
  label: string;
  fn: (s: string) => string;
}

function ActionGrid({
  actions,
  input,
  onResult,
}: {
  actions: ActionDef[];
  input: string;
  onResult: (out: string, tool: string) => void;
}): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {actions.map((a) => (
        <Button
          key={a.label}
          variant="outline"
          size="sm"
          onClick={() => onResult(a.fn(input), a.label)}
        >
          {a.label}
        </Button>
      ))}
    </div>
  );
}

export function Transformations(): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const addHistory = useHistoryStore((s) => s.add);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const run = (out: string, tool: string): void => {
    setOutput(out);
    if (input) addHistory({ tool, category: "transformations", input, output: out });
  };

  const caseActions = useMemo<ActionDef[]>(
    () => [
      { label: "UPPERCASE", fn: toUpperCase },
      { label: "lowercase", fn: toLowerCase },
      { label: "Title Case", fn: toTitleCase },
      { label: "Sentence case", fn: toSentenceCase },
    ],
    [],
  );

  const programmingActions = useMemo<ActionDef[]>(
    () => [
      { label: "camelCase", fn: toCamelCase },
      { label: "PascalCase", fn: toPascalCase },
      { label: "snake_case", fn: toSnakeCase },
      { label: "kebab-case", fn: toKebabCase },
      { label: "SCREAMING_SNAKE", fn: toScreamingSnakeCase },
    ],
    [],
  );

  const reverseActions = useMemo<ActionDef[]>(
    () => [
      { label: "Reverse text", fn: reverseText },
      { label: "Reverse word order", fn: reverseWords },
    ],
    [],
  );

  const whitespaceActions = useMemo<ActionDef[]>(
    () => [
      { label: "Remove extra spaces", fn: removeExtraSpaces },
      { label: "Remove all whitespace", fn: removeAllWhitespace },
      { label: "Trim each line", fn: trimEachLine },
    ],
    [],
  );

  const lineActions = useMemo<ActionDef[]>(
    () => [
      { label: "Remove duplicates", fn: removeDuplicateLines },
      { label: "Sort A→Z", fn: (s) => sortLines(s, "asc") },
      { label: "Sort Z→A", fn: (s) => sortLines(s, "desc") },
      { label: "Reverse lines", fn: reverseLines },
      { label: "Shuffle lines", fn: (s) => shuffleLines(s) },
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Transformations"
        description="Convert between cases, reverse text, normalize whitespace, and run line operations."
        icon={Wand2}
      />

      <Card className="mb-6 border-border/60">
        <CardContent className="grid gap-4 p-4 md:grid-cols-2">
          <TextInput value={input} onChange={setInput} label="Input" rows={10} />
          <ResultPanel value={output} rows={10} />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <ToolSection id="case" title="Case Conversion" description="Standard text casing.">
          <ActionGrid actions={caseActions} input={input} onResult={run} />
        </ToolSection>
        <ToolSection
          id="programming"
          title="Programming Case"
          description="Identifier-friendly casing for code."
        >
          <ActionGrid actions={programmingActions} input={input} onResult={run} />
        </ToolSection>
        <ToolSection id="reverse" title="Reverse" description="Reverse characters or word order.">
          <ActionGrid actions={reverseActions} input={input} onResult={run} />
        </ToolSection>
        <ToolSection
          id="whitespace"
          title="Whitespace"
          description="Clean up spaces, tabs, and trailing whitespace."
        >
          <ActionGrid actions={whitespaceActions} input={input} onResult={run} />
        </ToolSection>
        <ToolSection
          id="lines"
          title="Line Operations"
          description="Sort, dedupe, reverse, and shuffle lines."
        >
          <ActionGrid actions={lineActions} input={input} onResult={run} />
        </ToolSection>
      </div>
    </div>
  );
}
