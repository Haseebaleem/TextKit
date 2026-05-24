import { useCallback } from "react";
import toast from "react-hot-toast";

export function useCopyToClipboard(): (text: string, label?: string) => Promise<boolean> {
  return useCallback(async (text: string, label = "Copied to clipboard") => {
    if (!text) {
      toast.error("Nothing to copy");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
      return true;
    } catch {
      toast.error("Copy failed");
      return false;
    }
  }, []);
}
