"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpFormData } from "@/lib/auth-schemas";
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

export default function SignUpPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    setServerError(null);
    setIsLoading(true);

    try {
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        setServerError(res.error.message || "Something went wrong.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Sign-up error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="w-120 h-screen flex items-center justify-center flex-col mx-auto p-6">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Sign up to get started
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
                <Label>Full Name</Label>
              </FieldLabel>
              <FieldContent>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-md bg-background border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
                />
                <FieldError errors={[errors.name]} />
              </FieldContent>
            </Field>

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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
