"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const redirectTo = typeof window !== "undefined" ? `${window.location.origin}` : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Failed to send magic link");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Check your email</h1>
        <p className="text-sm text-muted-foreground">A sign-in link has been sent to {email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          placeholder="you@example.com"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send magic link"}
      </button>
    </form>
  );
}
