"use client";

import { Priority, Status } from "@/lib/types";
import { useState, useEffect } from "react";

export function FiltersPanel({
  value,
  onChange,
}: {
  value: {
    categoryId: string | null;
    priority: Priority;
    status: Status | null;
    dueDate: string | null; // YYYY-MM-DD
    search: string;
  };
  onChange: (v: {
    categoryId: string | null;
    priority: Priority;
    status: Status | null;
    dueDate: string | null;
    search: string;
  }) => void;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);
  useEffect(() => onChange(local), [local]);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Search</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          placeholder="Search title or notes"
          value={local.search}
          onChange={(e) => setLocal((f) => ({ ...f, search: e.target.value }))}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Priority</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={local.priority ?? ""}
          onChange={(e) =>
            setLocal((f) => ({ ...f, priority: (e.target.value || null) as Priority }))
          }
        >
          <option value="">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Status</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={local.status ?? ""}
          onChange={(e) =>
            setLocal((f) => ({ ...f, status: (e.target.value || null) as Status | null }))
          }
        >
          <option value="">Any</option>
          <option value="open">Open</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Due date</label>
        <input
          type="date"
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={local.dueDate ?? ""}
          onChange={(e) => setLocal((f) => ({ ...f, dueDate: e.target.value || null }))}
        />
        <button
          className="text-xs text-muted-foreground hover:underline"
          onClick={() => setLocal((f) => ({ ...f, dueDate: null }))}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
