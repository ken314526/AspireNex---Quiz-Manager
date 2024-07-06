"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex gap-2">
      <div className="w-5 h-5 rounded-full animate-pulse bg-slate-700"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-slate-700"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-slate-700"></div>
    </div>
  );
}
