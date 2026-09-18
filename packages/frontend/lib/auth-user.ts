import { MOCK_USER } from "@/app/mock/dashboardMock";

export interface DisplayUser {
  name: string;
  email: string;
  initials: string;
  firstName: string;
}

interface SessionUser {
  name?: string | null;
  email?: string | null;
}

function initialsFor(name: string, email: string): string {
  const fromName = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  if (fromName) return fromName;
  return email.slice(0, 2).toUpperCase();
}

// Real session user when signed in, mock profile otherwise (mock phase).
export function resolveDisplayUser(
  sessionUser?: SessionUser | null,
): DisplayUser {
  const name = sessionUser?.name?.trim() || MOCK_USER.name;
  const email = sessionUser?.email?.trim() || MOCK_USER.email;
  return {
    name,
    email,
    initials: initialsFor(name, email),
    firstName: name.split(/\s+/)[0],
  };
}
