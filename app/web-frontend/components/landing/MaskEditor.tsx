"use client";

import React, { useState, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Point {
  x: number; // 0–1 in objectBoundingBox space
  y: number;
}

interface MaskEditorProps {
  /** Initial ridge points (x,y) in 0–1 box coords */
  initialPoints: Point[];
  /** Called every time any point moves — gives back the full SVG path d attribute */
  onChange?: (path: string) => void;
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function buildPath(pts: Point[]): string {
  if (pts.length === 0) return "";
  const ridge = pts.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(" L");
  return `M0,1 L1,1 L1,${pts[pts.length - 1].y.toFixed(3)} L${ridge} L0,${pts[0].y.toFixed(3)} Z`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MaskEditor({ initialPoints, onChange }: MaskEditorProps) {
  const [points, setPoints] = useState<Point[]>(initialPoints);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingIdx = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMouseDown = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    draggingIdx.current = idx;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingIdx.current === null || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setPoints((prev) => {
        const next = prev.map((p, i) =>
          i === draggingIdx.current ? { x, y } : p
        );
        onChange?.(buildPath(next));
        return next;
      });
    },
    [onChange]
  );

  const handleMouseUp = () => {
    draggingIdx.current = null;
  };

  const pathStr = buildPath(points);

  const handleCopy = () => {
    navigator.clipboard.writeText(pathStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="absolute inset-0 w-full h-full z-[9999] cursor-crosshair"
      style={{ userSelect: "none" }}
    >
      {/* Live SVG preview of mask shape */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1 1" preserveAspectRatio="none">
        <path d={pathStr} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.003" />
        {/* Horizontal guides */}
        {[0.3, 0.4, 0.5, 0.6, 0.7].map((y) => (
          <line key={y} x1="0" y1={y} x2="1" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.001" />
        ))}
        {/* Vertical guides */}
        {[0.25, 0.5, 0.75].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.001" />
        ))}
      </svg>

      {/* Draggable handles */}
      {points.map((p, i) => (
        <div
          key={i}
          onMouseDown={handleMouseDown(i)}
          className="absolute flex items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow-lg cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
          style={{
            width: 20,
            height: 20,
            left: `calc(${p.x * 100}% - 10px)`,
            top: `calc(${p.y * 100}% - 10px)`,
          }}
          title={`Point ${i}: x=${p.x.toFixed(3)}, y=${p.y.toFixed(3)}`}
        >
          <span className="text-[8px] font-bold text-white select-none">{i}</span>
        </div>
      ))}

      {/* Output panel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-[90vw] max-w-2xl text-xs font-mono text-green-300 shadow-2xl z-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60 uppercase tracking-widest text-[10px]">SVG Mask Path — drag the blue dots to reshape</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-[10px] transition-all"
          >
            {copied ? "✓ Copied!" : "Copy Path"}
          </button>
        </div>
        <div className="overflow-auto max-h-20 break-all text-green-400">
          d=&quot;{pathStr}&quot;
        </div>
        <p className="text-white/30 text-[9px] mt-2">
          Tip: Drag any blue handle • Copy the path string • Paste it into <code>Section1.tsx</code> to apply permanently
        </p>
      </div>
    </div>
  );
}
