import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Globe } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [agree, setAgree] = useState(true);

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
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex flex-1 justify-center items-center bg-white">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md mx-auto flex flex-col gap-6 px-6"
        >
          <div className="mb-2">
            <h2 className="text-4xl font-bold text-center mb-2">Welcome Back</h2>
            <div className="text-lg text-center text-muted-foreground mb-4">Sign Up For Free</div>
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
                className="rounded-md bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1 block">Password</Label>
              <Input
                id="password"
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-md bg-muted"
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
            className="w-full rounded-full bg-[#884CFF] hover:bg-[#884CFF]/90 font-semibold text-base py-3 mt-2"
            disabled={submitting}
          >
            {submitting ? "Signing In..." : "Get Started"}
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
            Already have an account?{" "}
            <span
              className="text-[#884CFF] font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
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
