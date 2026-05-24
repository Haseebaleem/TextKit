import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Binary } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TextInput } from "@/components/shared/TextInput";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { ToolSection } from "@/components/shared/ToolSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useHistoryStore } from "@/stores/history.store";
import {
  base64Decode,
  base64Encode,
  htmlDecode,
  htmlEncode,
  urlDecode,
  urlEncode,
} from "@/lib/text-utils";

type Direction = "encode" | "decode";

interface EncoderBlockProps {
  toolKey: "base64" | "url" | "html";
  label: string;
  encode: (s: string) => string;
  decode: (s: string) => string;
}

function EncoderBlock({ toolKey, label, encode, decode }: EncoderBlockProps): JSX.Element {
  const [direction, setDirection] = useState<Direction>("encode");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addHistory = useHistoryStore((s) => s.add);

  const output = useMemo(() => {
    setError(null);
    if (!input) return "";
    try {
      return direction === "encode" ? encode(input) : decode(input);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
      return "";
    }
  }, [input, direction, encode, decode]);

  useEffect(() => {
    if (input && output) {
      addHistory({
        tool: `${label} ${direction}`,
        category: "encoding",
        input,
        output,
      });
    }
  }, [output, addHistory, label, direction, input]);

  const swap = (): void => {
    setDirection((d) => (d === "encode" ? "decode" : "encode"));
    setInput(output);
  };

  return (
    <ToolSection
      id={toolKey}
      title={label}
      description={direction === "encode" ? "Encode input → output." : "Decode input → output."}
      actions={
        <div className="flex items-center gap-2">
          <Tabs value={direction} onValueChange={(v) => setDirection(v as Direction)}>
            <TabsList className="h-9">
              <TabsTrigger value="encode" className="text-xs">
                Encode
              </TabsTrigger>
              <TabsTrigger value="decode" className="text-xs">
                Decode
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={swap} aria-label="Swap input and output">
            <ArrowLeftRight />
            <span className="sr-only sm:not-sr-only">Swap</span>
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput value={input} onChange={setInput} label="Input" rows={8} />
        <ResultPanel
          value={error ? "" : output}
          rows={8}
          emptyText={error ?? "Output will appear here…"}
        />
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </ToolSection>
  );
}

export function Encoding(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Encoding"
        description="UTF-8 safe Base64, URL component encoding, and HTML entity escaping."
        icon={Binary}
      />
      <Card className="mb-6 border-dashed border-border/60 bg-card/40">
        <CardContent className="p-4 text-xs text-muted-foreground">
          All encoders run locally. Base64 uses TextEncoder/TextDecoder so non-ASCII text (emoji,
          Urdu, accented characters) round-trips correctly.
        </CardContent>
      </Card>
      <div className="space-y-6">
        <EncoderBlock toolKey="base64" label="Base64" encode={base64Encode} decode={base64Decode} />
        <EncoderBlock toolKey="url" label="URL Component" encode={urlEncode} decode={urlDecode} />
        <EncoderBlock toolKey="html" label="HTML Entities" encode={htmlEncode} decode={htmlDecode} />
      </div>
    </div>
  );
}
