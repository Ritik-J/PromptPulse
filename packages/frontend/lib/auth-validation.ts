import {
  AUTH_ERROR_MESSAGES,
  AUTH_FALLBACK_ERROR,
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/constants/auth";

export type AuthMode = "signup" | "signin";

export interface PasswordCheck {
  label: string;
  met: boolean;
}

export interface AuthFormInput {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

// Maps a Better-Auth server error to user-facing copy. Falls back to the
// server message so unmapped codes still render something useful.
export function friendlyAuthError(error: {
  code?: string;
  message?: string;
}): string {
  if (error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }
  return error.message ?? AUTH_FALLBACK_ERROR;
}

export function passwordChecks(password: string): PasswordCheck[] {
  return [
    {
      label: `At least ${MIN_PASSWORD_LENGTH} characters`,
      met: password.length >= MIN_PASSWORD_LENGTH,
    },
    {
      label: "Contains a letter and a number",
      met: /[A-Za-z]/.test(password) && /\d/.test(password),
    },
  ];
}

export interface NormalizedAuthForm {
  name: string;
  email: string;
}

// Normalizes raw form state (trim, lowercase email). Pure — no validation.
export function normalizeAuthForm(input: AuthFormInput): NormalizedAuthForm {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
  };
}

// Client-side validation mirroring the server policy (min/max length) so
// users get instant feedback without a round trip. Returns an error message
// or null when the input is valid.
export function validateAuthForm(
  mode: AuthMode,
  input: AuthFormInput,
): string | null {
  const { name, email } = normalizeAuthForm(input);

  if (mode === "signup" && name.length < MIN_NAME_LENGTH) {
    return "Please enter your name.";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address.";
  }
  if (
    input.password.length < MIN_PASSWORD_LENGTH ||
    input.password.length > MAX_PASSWORD_LENGTH
  ) {
    return `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`;
  }
  if (mode === "signup" && input.password !== input.confirm) {
    return "Passwords do not match.";
  }
  return null;
}
