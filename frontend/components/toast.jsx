import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500); // Se oculta automáticamente a los 3.5 segundos

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl transition-all border border-slate-800 animate-slide-up">
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white ml-2 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toast;