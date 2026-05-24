import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES, TOOLS } from "@/lib/tool-registry";
import { Search } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps): JSX.Element {
  const navigate = useNavigate();

  const go = (path: string): void => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideClose
        className="max-w-xl gap-0 overflow-hidden p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Jump to tool</DialogTitle>
        <Command className="w-full" loop>
          <div className="flex items-center gap-2 border-b border-border/60 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Command.Input
              placeholder="Search tools…"
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <Command.List className="max-h-[420px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No tools found.
            </Command.Empty>
            {CATEGORIES.map((cat) => (
              <Command.Group
                key={cat.id}
                heading={cat.name}
                className="px-1 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {TOOLS.filter((t) => t.category.id === cat.id).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Command.Item
                      key={tool.id}
                      value={`${tool.name} ${tool.description} ${tool.keywords.join(" ")}`}
                      onSelect={() => go(`${tool.path}#${tool.hash}`)}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-accent"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>{tool.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{tool.description}</span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
