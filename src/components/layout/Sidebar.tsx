import { NavLink, Link } from "react-router-dom";
import { Home, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TOOLS } from "@/lib/tool-registry";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps): JSX.Element {
  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-border/60 bg-card/40 transition-transform md:sticky md:top-14 md:z-0 md:h-[calc(100vh-3.5rem)] md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border/60 px-4 md:hidden">
          <span className="text-sm font-semibold">Navigation</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-3.5rem)] md:h-full">
          <nav className="flex flex-col gap-1 p-3">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const tools = TOOLS.filter((t) => t.category.id === category.id);
              return (
                <div key={category.id} className="mt-3">
                  <NavLink
                    to={category.path}
                    onClick={onClose}
                    end
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent",
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </NavLink>
                  <ul className="ml-6 mt-1 space-y-0.5 border-l border-border/60 pl-3">
                    {tools.map((tool) => (
                      <li key={tool.id}>
                        <Link
                          to={`${tool.path}#${tool.hash}`}
                          onClick={onClose}
                          className="block rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "mt-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              About
            </NavLink>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
