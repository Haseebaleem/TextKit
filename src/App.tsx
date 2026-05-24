import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { useApplyTheme } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Transformations } from "@/pages/tools/Transformations";
import { Analysis } from "@/pages/tools/Analysis";
import { Encoding } from "@/pages/tools/Encoding";
import { Generators } from "@/pages/tools/Generators";
import { Developer } from "@/pages/tools/Developer";

export function App(): JSX.Element {
  useApplyTheme();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        onOpenCommand={() => setCmdOpen(true)}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools/transformations" element={<Transformations />} />
            <Route path="/tools/analysis" element={<Analysis />} />
            <Route path="/tools/encoding" element={<Encoding />} />
            <Route path="/tools/generators" element={<Generators />} />
            <Route path="/tools/developer" element={<Developer />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "!bg-popover !text-popover-foreground !border !border-border",
          style: { fontSize: "13px" },
        }}
      />
    </div>
  );
}
