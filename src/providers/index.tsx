import type { PropsWithChildren } from "react";
import { QueryProvider } from "./query.provider";
import { Toaster } from "sonner";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
      <Toaster
        richColors
        position="top-right"
      />
    </QueryProvider>
  );
}
