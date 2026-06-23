import React from "react";

export default function CodeBlock({ code, output, small = false }) {
  return (
    <div className="w-full space-y-2">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "rgba(139, 92, 246, 0.1)" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="text-[10px] text-slate-500 ml-2 font-mono">python</span>
        </div>
        <pre className={`px-4 py-3 overflow-x-auto ${small ? "text-xs" : "text-sm"}`}>
          <code className="font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap">{code}</code>
        </pre>
      </div>
      {output && (
        <div
          className="rounded-xl px-4 py-2.5 overflow-x-auto"
          style={{
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.15)",
          }}
        >
          <div className="text-[10px] text-emerald-500/60 font-mono mb-1">OUTPUT</div>
          <pre className={`font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap ${small ? "text-xs" : "text-sm"}`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}