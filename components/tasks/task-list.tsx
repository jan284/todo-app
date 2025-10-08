"use client";

import { TaskItem } from "@/components/tasks/task-item";
import { useTasks } from "@/lib/db/tasks";
import type { TaskFilters } from "@/lib/db/tasks";

export function TaskList({ filters }: { filters: TaskFilters }) {
  const { data: tasks = [], isLoading } = useTasks(filters);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading tasks…</div>;
  }

  if (!tasks.length) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        No tasks yet. Create your first task!
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-2">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
}
