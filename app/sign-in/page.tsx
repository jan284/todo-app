import { SignInForm } from "@/components/sign-in-form";

export default function SignInPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a magic link.
          </p>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
