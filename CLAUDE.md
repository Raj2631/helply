# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm prisma migrate dev   # Apply schema changes and generate client
pnpm prisma studio        # Open Prisma Studio GUI
```

Local PostgreSQL is managed via Docker:
```bash
docker compose up -d   # Start PostgreSQL on port 5432
```

## Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres?schema=public"
BETTER_AUTH_SECRET=<secret>
BETTER_AUTH_URL=http://localhost:3000
```

## Architecture

**Stack**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Prisma 7 + PostgreSQL, Better-Auth, Shadcn/ui

**App**: A care marketplace connecting clients (care seekers) with caregivers. Users have a `role` enum (CLIENT/CAREGIVER/ADMIN) and a corresponding profile.

### Route Groups

- `app/(auth)/(routes)/` — Public sign-in/sign-up pages
- `app/(main)/(protected-routes)/` — Authenticated area (dashboard, etc.)
- `app/api/auth/[...all]/` — Better-Auth catch-all handler

Protected routes are guarded client-side in `app/(main)/(protected-routes)/layout.tsx` using `useSession()`.

### Key Files

| File | Purpose |
|------|---------|
| `lib/auth.ts` | Better-Auth server config (Prisma adapter, email/password) |
| `lib/auth-client.ts` | Client hooks: `signIn`, `signUp`, `signOut`, `useSession` |
| `lib/auth-schemas.ts` | Zod schemas for sign-in/sign-up validation |
| `lib/prisma.ts` | Prisma singleton with PostgreSQL adapter |
| `prisma/schema.prisma` | DB schema — User, Session, Account, Verification, ClientProfile, CaregiverProfile |

### Data Model

- `User` has a `role` (CLIENT/CAREGIVER/ADMIN) and optional `ClientProfile` or `CaregiverProfile` (1-to-1, cascade delete)
- `CaregiverProfile` has `hourlyRate`, `ratingAverage`, `ratingCount`, `isVerified`
- Auth tables (`Session`, `Account`, `Verification`) are managed by Better-Auth — do not modify directly

### Path Alias

`@/*` resolves to the project root.
