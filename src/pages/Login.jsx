import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("manager@slooze.com");
  const [password, setPassword] = useState("password");
  const [submitting, setSubmitting] = useState(false);
  const [agree, setAgree] = useState(true);
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast({ title: "Agreement Required", description: "You must agree to the terms.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.success) {
      toast({ title: "Login Success", description: "Welcome back!", duration: 2000 });
      navigate("/dashboard");
    } else {
      toast({ title: "Login Failed", description: res.error, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex relative bg-background text-foreground">
      {/* Theme Toggle Button - Bottom Left */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 left-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 z-50 flex items-center gap-2 text-sm"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
        <span className="sr-only sm:not-sr-only">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>
      {/* Form Container */}
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-xl bg-card shadow-sm border border-border"
          >
            <header className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue to your account</p>
            </header>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="manager@slooze.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={() => { }}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled>
                <svg className="mr-2 h-4 w-4 text-[#ea4335]" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" disabled>
                <svg className="mr-2 h-4 w-4 text-[#1877f2]" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="currentColor"
                  />
                </svg>
                Facebook
              </Button>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="hover:text-primary underline underline-offset-4"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
      {/* Right side image/illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted p-12">
        <div className="max-w-2xl text-center space-y-6">
          <div className="rounded-lg bg-muted-foreground/10 p-8">
            <div className="mx-auto h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-24 w-24 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Start your journey with us</h2>
          <p className="text-muted-foreground">
            Manage your inventory efficiently with our comprehensive dashboard and analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
