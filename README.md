# Todo App

React + Next.js + Tailwind + shadcn-style UI + Supabase

## Prerequisites
- Node 18+
- Supabase project (URL + anon key)

## Setup

```bash
pnpm i # or npm install / yarn
cp .env.local.example .env.local # fill values
pnpm dev
```

## Tech
- Next.js (App Router, TypeScript)
- Tailwind CSS, next-themes
- Supabase (client-side), React Query
- lucide-react icons, react-day-picker

## Next steps
- Provide Supabase auth preference (no auth vs email magic link)
- Run SQL for tables and RLS (will provide)
- Implement task UI with filters and category management
