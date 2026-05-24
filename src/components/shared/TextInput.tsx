import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  className?: string;
  id?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder = "Paste or type your text…",
  label,
  rows = 12,
  className,
  id,
}: TextInputProps): JSX.Element {
  const inputId = id ?? "tk-text-input";
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      <Textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        spellCheck={false}
      />
    </div>
  );
}
