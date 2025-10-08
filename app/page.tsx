import { ThemeToggle } from "@/components/theme-toggle";
import { AuthGate } from "@/components/auth-gate";

export default function Page() {
  return (
    <AuthGate>
      <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[280px_1fr]">
        <aside className="border-r p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <ThemeToggle />
          </div>
          <div className="text-sm text-muted-foreground">
            Category, Priority, Status, Due Date filters will go here.
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="text-sm text-muted-foreground">Manage categories here.</div>
          </div>
        </aside>
        <main className="p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <button className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 transition">
              New Task
            </button>
          </header>
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            Task list will render here.
          </div>
        </main>
      </div>
    </AuthGate>
  );
}
