import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps): JSX.Element {
  return (
    <div className="mb-6 flex items-start gap-4 border-b border-border/60 pb-6">
      {Icon ? (
        <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary sm:flex">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
