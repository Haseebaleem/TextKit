import { Link } from "react-router-dom";
import { Command, Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenSidebar: () => void;
}

export function Navbar({ onOpenCommand, onOpenSidebar }: NavbarProps): JSX.Element {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
            Tk
          </div>
          <span className="font-semibold tracking-tight">TextKit</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">/ developer text utilities</span>
        </Link>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommand}
            className="hidden gap-2 text-muted-foreground sm:inline-flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Jump to tool</span>
            <kbd className="ml-2 hidden rounded border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px] md:inline">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={onOpenCommand}
            aria-label="Open command palette"
          >
            <Command className="h-4 w-4" />
          </Button>
          <a
            href="https://github.com/Haseebaleem"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
