import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

// Same public API as his version (useToast().success/.error/.info) so
// nothing else you write needs to change — just the internals are simpler.

const UIContext = createContext(null);

const VARIANTS = {
  success: { icon: CheckCircle2, className: "text-[var(--success)] bg-[var(--accent-soft)]" },
  error: { icon: AlertCircle, className: "text-[var(--danger)] bg-[#F8E3E0]" },
  info: { icon: Info, className: "text-[var(--accent-strong)] bg-[var(--accent-soft)]" },
};

let _id = 0;

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration = 4000 } = {}) => {
      const id = ++_id;
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      if (duration > 0) {
        timers.current.set(id, setTimeout(() => dismiss(id), duration));
      }
      return id;
    },
    [dismiss]
  );

  toast.success = (title, description) => toast({ title, description, variant: "success" });
  toast.error = (title, description) => toast({ title, description, variant: "error" });
  toast.info = (title, description) => toast({ title, description, variant: "info" });

  return (
    <UIContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </UIContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useToast must be used inside UIProvider");
  return ctx.toast;
}

function ToastViewport({ toasts, dismiss }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 w-[340px]">
      {toasts.map((t) => {
        const { icon: Icon, className } = VARIANTS[t.variant];
        return (
          <div
            key={t.id}
            // plain CSS transition instead of AnimatePresence — still
            // animates in/out, just no animation library needed
            className="animate-[fadeSlideIn_0.2s_ease-out] bg-[var(--surface)] border border-[var(--border)] shadow-hover rounded-2xl p-3.5 flex items-start gap-3"
          >
            <div className={`h-8 w-8 shrink-0 rounded-xl flex items-center justify-center ${className}`}>
              <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              {t.title && <div className="text-sm font-semibold leading-tight">{t.title}</div>}
              {t.description && (
                <div className="text-xs text-[var(--ink-muted)] mt-0.5">{t.description}</div>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="h-7 w-7 rounded-full hover:bg-[var(--surface-2)] flex items-center justify-center text-[var(--ink-muted)] shrink-0"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}