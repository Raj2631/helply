"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInFormData } from "@/lib/auth-schemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    setServerError(null);
    setIsLoading(true);

    try {
      const res = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        setServerError(res.error.message || "Something went wrong.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="w-120 h-screen flex items-center justify-center flex-col mx-auto p-6">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {serverError && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>
                <Label>Email</Label>
              </FieldLabel>
              <FieldContent>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md bg-background border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
                />
                <FieldError errors={[errors.email]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>
                <Label>Password</Label>
              </FieldLabel>
              <FieldContent>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-md bg-background border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
                />
                <FieldError errors={[errors.password]} />
              </FieldContent>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
