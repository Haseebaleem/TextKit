import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ToolSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function ToolSection({
  title,
  description,
  children,
  id,
  className,
  actions,
}: ToolSectionProps): JSX.Element {
  return (
    <Card id={id} className={cn("scroll-mt-24", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
