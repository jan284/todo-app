"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FiltersPanel } from "@/components/sidebar/filters-panel";
import { TaskList } from "@/components/tasks/task-list";
import { TaskForm } from "@/components/tasks/task-form";
import type { Priority, Status } from "@/lib/types";

export function AppShell() {
  const [filters, setFilters] = useState<{
    categoryId: string | null;
    priority: Priority;
    status: Status | null;
    dueDate: string | null; // YYYY-MM-DD
    search: string;
  }>({ categoryId: null, priority: null, status: null, dueDate: null, search: "" });

  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[300px_1fr]">
      <aside className="border-r p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <ThemeToggle />
        </div>
        <FiltersPanel value={filters} onChange={setFilters} />
      </aside>
      <main className="p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 transition"
            onClick={() => setShowNew(true)}
          >
            New Task
          </button>
        </header>
        {showNew && (
          <div className="mb-4 rounded-lg border p-4">
            <TaskForm onCreated={() => setShowNew(false)} onCancel={() => setShowNew(false)} />
          </div>
        )}
        <TaskList filters={filters} />
      </main>
    </div>
  );
}