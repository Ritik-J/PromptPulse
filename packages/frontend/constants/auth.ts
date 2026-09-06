export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_NAME_LENGTH = 2;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server error codes → user-facing copy. `USER_NOT_FOUND` stays generic on
// purpose to avoid confirming whether an email is registered.
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS:
    "An account with this email already exists. Try signing in instead.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "An account with this email already exists. Try signing in instead.",
  INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password. Please try again.",
  INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
  USER_NOT_FOUND: "Incorrect email or password. Please try again.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_TOO_SHORT: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  PASSWORD_TOO_LONG: `Password must be under ${MAX_PASSWORD_LENGTH} characters.`,
  TOO_MANY_REQUESTS: "Too many attempts. Please wait a minute and try again.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
};

export const AUTH_FALLBACK_ERROR = "Authentication failed. Please try again.";

export const AUTH_UNREACHABLE_ERROR =
  "Could not reach the auth server. Is the backend running on :4000?";
