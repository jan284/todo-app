export type Priority = "low" | "medium" | "high" | null; // null = None
export type Status = "open" | "completed";

export interface Category {
  id: string;
  name: string;
  color?: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  notes?: string | null;
  status: Status; // derived from completed boolean in DB if needed
  category_id?: string | null;
  priority: Priority; // null = None
  due_date?: string | null; // ISO date
  created_at: string;
  updated_at: string;
}
