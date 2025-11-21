// @ts-nocheck
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type ToastVariant = "default" | "success" | "error" | "destructive";

export type ToastOptions = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

type Toast = ToastOptions & {
  id: string;
};

type ToastContextValue = {
  toasts: Toast[];
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = crypto.randomUUID();
      const next: Toast = { id, ...options };
      setToasts((prev) => [...prev, next]);

      // auto-dismiss po 4s
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}

      {/* Simple toast renderer v pravom dolnom rohu */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[220px] rounded-lg px-4 py-3 shadow-lg text-sm text-white ${
              t.variant === "error" || t.variant === "destructive"
                ? "bg-red-600/90"
                : t.variant === "success"
                ? "bg-emerald-600/90"
                : "bg-neutral-900/90"
            }`}
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            {t.description && (
              <div className="opacity-90 leading-snug">{t.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    return {
      toasts: [] as Toast[],
      toast: (options: ToastOptions) =>
        console.warn("useToast called without ToastProvider", options),
      dismiss: (_id: string) => {},
    };
  }

  return ctx;
}
