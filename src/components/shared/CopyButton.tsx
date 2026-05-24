import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  size?: "default" | "sm" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  size = "sm",
  variant = "outline",
  className,
}: CopyButtonProps): JSX.Element {
  const copy = useCopyToClipboard();
  const [justCopied, setJustCopied] = useState(false);

  const handle = async (): Promise<void> => {
    const ok = await copy(value);
    if (ok) {
      setJustCopied(true);
      window.setTimeout(() => setJustCopied(false), 1500);
    }
  };

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={handle}
      className={cn("gap-1.5", className)}
      aria-label={label}
    >
      {justCopied ? <Check className="text-green-500" /> : <Copy />}
      {size !== "icon" ? <span>{justCopied ? "Copied" : label}</span> : null}
    </Button>
  );
}
