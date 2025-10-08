"use client";

import { useState } from "react";
import { useCreateTask } from "@/lib/db/tasks";
import { useCategories } from "@/lib/db/categories";
import type { Priority } from "@/lib/types";

export function TaskForm({ onCreated, onCancel }: { onCreated?: () => void; onCancel?: () => void }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [categoryId, setCategoryId] = useState<string | "">("");
  const [priority, setPriority] = useState<Priority>(null);
  const [dueDate, setDueDate] = useState<string>("");
  const createMut = useCreateTask();
  const { data: categories = [] } = useCategories();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await createMut.mutateAsync({
      title: title.trim(),
      notes: notes.trim() || null,
      category_id: categoryId || null,
      priority,
      due_date: dueDate || null,
    });
    setTitle("");
    setNotes("");
    setCategoryId("");
    setPriority(null);
    setDueDate("");
    onCreated?.();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      <div className="space-y-1 md:col-span-2">
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a task..."
          required
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="text-sm font-medium">Notes</label>
        <textarea
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional details"
          rows={3}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Priority</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={priority ?? ""}
          onChange={(e) => setPriority((e.target.value || null) as Priority)}
        >
          <option value="">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Due date</label>
        <input
          type="date"
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="md:col-span-2 flex items-center gap-2">
        <button type="submit" className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50">
          Create task
        </button>
        <button type="button" className="text-sm text-muted-foreground hover:underline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
