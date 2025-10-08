"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Task, Priority, Status } from "@/lib/types";

export type TaskFilters = {
  categoryId: string | null;
  priority: Priority; // null = any
  status: Status | null; // null = any
  dueDate: string | null; // YYYY-MM-DD
  search: string;
};

const keys = {
  all: ["tasks"] as const,
  list: (f: TaskFilters) => ["tasks", f] as const,
};

function baseSelect() {
  return supabase
    .from("tasks")
    .select("id,title,notes,category_id,priority,due_date,completed,created_at,updated_at")
    .order("created_at", { ascending: false });
}

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: keys.list(filters),
    queryFn: async (): Promise<Task[]> => {
      let q = baseSelect();
      if (filters.categoryId) q = q.eq("category_id", filters.categoryId);
      if (filters.priority !== null) q = q.eq("priority", filters.priority);
      if (filters.status === "completed") q = q.eq("completed", true);
      if (filters.status === "open") q = q.eq("completed", false);
      if (filters.dueDate) q = q.eq("due_date", filters.dueDate);
      const { data, error } = await q;
      if (error) throw error;
      const rows = (data ?? []).map((r: any) => ({
        id: r.id,
        title: r.title,
        notes: r.notes,
        category_id: r.category_id,
        priority: r.priority as Priority,
        due_date: r.due_date,
        status: r.completed ? "completed" : "open",
        created_at: r.created_at,
        updated_at: r.updated_at,
      })) as Task[];
      if (filters.search?.trim()) {
        const s = filters.search.toLowerCase();
        return rows.filter((t) => t.title.toLowerCase().includes(s) || (t.notes ?? "").toLowerCase().includes(s));
      }
      return rows;
    },
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      notes?: string | null;
      category_id?: string | null;
      priority: Priority;
      due_date?: string | null;
    }) => {
      const { error } = await supabase.from("tasks").insert({
        title: payload.title,
        notes: payload.notes ?? null,
        category_id: payload.category_id ?? null,
        priority: payload.priority,
        due_date: payload.due_date ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      title?: string;
      notes?: string | null;
      category_id?: string | null;
      priority?: Priority;
      due_date?: string | null;
      completed?: boolean;
    }) => {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("tasks").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
}
