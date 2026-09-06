"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  signIn,
  signUp,
  signOut,
  useSession,
  appCallbackURL,
} from "@/lib/auth-client";
import {
  friendlyAuthError,
  normalizeAuthForm,
  passwordChecks,
  validateAuthForm,
  type AuthMode,
} from "@/lib/auth-validation";
import {
  AUTH_UNREACHABLE_ERROR,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/constants/auth";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
        fill="#EA4335"
      />
      <path
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
        fill="#4285F4"
      />
      <path
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
        fill="#FBBC05"
      />
      <path
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
        fill="#34A853"
      />
    </svg>
  );
}

export default function AuthSection() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { data: session, isPending: sessionPending } = useSession();

  const checks = passwordChecks(password);

  async function handleGoogle() {
    setError(null);
    setPending(true);
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: appCallbackURL,
      });
      if (error) {
        setError(friendlyAuthError(error));
        setPending(false);
      }
    } catch {
      setError(AUTH_UNREACHABLE_ERROR);
      setPending(false);
    }
    // On success Better-Auth redirects to Google, so no further handling.
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateAuthForm(mode, {
      name,
      email,
      password,
      confirm,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    const { name: cleanName, email: cleanEmail } = normalizeAuthForm({
      name,
      email,
      password,
      confirm,
    });

    setPending(true);
    try {
      const { error } =
        mode === "signup"
          ? await signUp.email({
              name: cleanName,
              email: cleanEmail,
              password,
              callbackURL: appCallbackURL,
            })
          : await signIn.email({
              email: cleanEmail,
              password,
              callbackURL: appCallbackURL,
            });
      if (error) setError(friendlyAuthError(error));
    } catch {
      setError(AUTH_UNREACHABLE_ERROR);
    } finally {
      setPending(false);
    }
  }

  async function handleSignOut() {
    setError(null);
    try {
      await signOut();
    } catch {
      setError(AUTH_UNREACHABLE_ERROR);
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16" id="auth-section">
      <Card className="relative p-8 md:p-12 overflow-hidden grid-subtle">
        {/* Ambient glow */}
        <div
          className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(200,189,178,0.07)" }}
        />

        <CardContent className="relative max-w-md mx-auto text-center p-0">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "var(--surface-high)",
              border: "1px solid rgba(152,143,135,0.3)",
              color: "var(--primary-color)",
            }}
          >
            <KeyRound size={22} />
          </div>

          {/* Heading */}
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--primary-color)",
            }}
          >
            Join top LLM engineering teams
          </h2>
          <p
            className="mt-2 text-xs"
            style={{ color: "var(--on-surface-variant)" }}
          >
            Deploy production-ready prompt version control in under 3 minutes.
          </p>

          {sessionPending ? (
            <p className="mt-6 text-sm" style={{ color: "var(--outline)" }}>
              Checking session…
            </p>
          ) : session?.user ? (
            <div className="mt-6 space-y-3">
              <p className="text-sm">
                Signed in as{" "}
                <span className="font-medium">
                  {session.user.name ?? session.user.email}
                </span>
              </p>
              {error && (
                <p className="text-xs text-red-500" role="alert">
                  {error}
                </p>
              )}
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full py-2.5"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <>
              {/* OAuth Buttons */}
              <div className="mt-6 flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  onClick={handleGoogle}
                  disabled={pending}
                  className="w-full py-2.5 flex items-center justify-center gap-3 text-sm font-normal"
                >
                  <GoogleIcon />
                  {pending ? "Redirecting…" : "Continue with Google"}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <Separator className="absolute" />
                <span
                  className="relative z-10 px-2 font-mono text-[11px] uppercase"
                  style={{
                    background: "var(--surface-container)",
                    color: "var(--outline)",
                  }}
                >
                  or with work email
                </span>
              </div>

              {/* Email / Password */}
              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                {mode === "signup" && (
                  <div>
                    <Label className="block mb-1">Name</Label>
                    <Input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Engineer"
                    />
                  </div>
                )}
                <div>
                  <Label className="block mb-1">Work Email</Label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@engineering.ai"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label>Password</Label>
                    <a
                      href="#"
                      className="text-[11px] transition-colors hover:text-[color:var(--primary-color)]"
                      style={{ color: "var(--outline)" }}
                    >
                      Forgot?
                    </a>
                  </div>
                  <Input
                    type="password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    maxLength={MAX_PASSWORD_LENGTH}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                  />
                  {mode === "signup" && password.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {checks.map((check) => (
                        <li
                          key={check.label}
                          className="text-[11px]"
                          style={{
                            color: check.met
                              ? "var(--primary-color)"
                              : "var(--outline)",
                          }}
                        >
                          {check.met ? "✓ " : "· "}
                          {check.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {mode === "signup" && (
                  <div>
                    <Label className="block mb-1">Confirm Password</Label>
                    <Input
                      type="password"
                      required
                      minLength={MIN_PASSWORD_LENGTH}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="new-password"
                    />
                  </div>
                )}
                {error && (
                  <p className="text-xs text-red-500" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  disabled={pending}
                  className="w-full mt-2"
                >
                  {pending
                    ? "Please wait…"
                    : mode === "signup"
                      ? "Create PromptPulse Account"
                      : "Sign In"}
                </Button>
              </form>

              <p className="mt-4 text-xs" style={{ color: "var(--outline)" }}>
                {mode === "signup"
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Button
                  variant="link"
                  onClick={() => {
                    setMode((m) => (m === "signup" ? "signin" : "signup"));
                    setError(null);
                    setConfirm("");
                  }}
                  className="font-medium"
                >
                  {mode === "signup" ? "Sign in" : "Sign up"}
                </Button>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
