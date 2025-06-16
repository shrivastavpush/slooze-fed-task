import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Facebook, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className={`min-h-screen flex relative ${theme === 'dark' ? 'dark bg-background' : 'bg-background'}`}>
      {/* Theme Toggle Button - Bottom Left */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 left-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors z-50 flex items-center gap-2"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-5 h-5" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
      {/* Left - Form */}
      <div className="flex flex-1 justify-center items-center bg-card">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md mx-auto flex flex-col gap-6 p-8 rounded-xl bg-card shadow-lg border border-border"
        >
          <div className="mb-2 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h2>
            <div className="text-lg text-muted-foreground">Login To Your Account</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="email" className="mb-1 block">Email</Label>
              <Input
                id="email"
                required
                type="email"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-md bg-background"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1 block text-foreground">Password</Label>
              <Input
                id="password"
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-md bg-background"
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                className="accent-primary size-4"
                required
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                I agree to all Term, Privacy Policy and fees
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-primary hover:bg-primary/90 font-semibold text-base py-3 mt-2 text-primary-foreground"
            disabled={submitting}
          >
            {submitting ? "Logging In..." : "Login"}
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-muted" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-muted" />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-base rounded-full"
              disabled
            >
              <Globe size={18} className="mr-2 text-[#ea4335]" /> {/* used Globe in place of Google */}
              Sign in with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-base rounded-full"
              disabled
            >
              <Facebook size={18} className="mr-2 text-[#1877f3]" />
              Sign in with Facebook
            </Button>
          </div>
          <div className="text-sm text-center text-muted-foreground pt-2">
            Don't have an account?{" "}
            <span
              className="text-primary font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div>
        </form>
      </div>
      {/* Right - Image */}
      <div className="hidden md:block flex-1 bg-black relative">
        <img
          src="https://www.dummyimg.in/placeholder?text=Login Visual&width=1200&height=800"
          alt="Login Visual"
          className="object-cover w-full h-full min-h-screen"
        />
      </div>
    </div>
  );
}
