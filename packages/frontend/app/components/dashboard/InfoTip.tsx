"use client";

import { Info } from "lucide-react";

interface InfoTipProps {
  text: string;
  label?: string;
}

export default function InfoTip({ text, label = "More info" }: InfoTipProps) {
  return (
    <span
      className="group relative inline-flex items-center ml-1 align-middle"
      tabIndex={0}
      role="img"
      aria-label={label + ": " + text}
    >
      <Info
        size={12}
        className="text-[var(--outline)] transition-colors group-hover:text-[var(--primary-color)] cursor-help"
      />
      <span
        role="tooltip"
        className="pointer-events-none absolute z-50 left-1/2 top-full mt-2 w-52 -translate-x-1/2 rounded-lg border px-2.5 py-2 text-left text-[11px] font-sans font-normal normal-case leading-relaxed tracking-normal opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: "var(--surface-high)",
          borderColor: "var(--surface-variant)",
          color: "var(--on-surface)",
        }}
      >
        {text}
      </span>
    </span>
  );
}
