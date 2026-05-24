import { CopyButton } from "./CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  value: string;
  label?: string;
  emptyText?: string;
  className?: string;
  monospace?: boolean;
  rows?: number;
}

export function ResultPanel({
  value,
  label = "Result",
  emptyText = "Output will appear here…",
  className,
  rows = 12,
}: ResultPanelProps): JSX.Element {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <CopyButton value={value} />
      </div>
      <Textarea
        value={value}
        readOnly
        rows={rows}
        placeholder={emptyText}
        spellCheck={false}
        className="bg-muted/40"
      />
    </div>
  );
}
