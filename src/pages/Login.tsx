
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || "/dashboard";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isSuccess = login(username, password);
    
    if (isSuccess) {
      toast({
        title: "Login successful",
        description: "Welcome back, Jatin!",
        duration: 3000,
      });
      // Redirect to the original intended destination or dashboard
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-blog-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="font-serif font-bold text-3xl mb-2">Jatin's Journal</h1>
          <p className="font-serif text-gray-600">Hey Jatin, welcome to your Journal. Sign in to see more.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="font-sans text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="font-sans text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blog-accent hover:bg-red-700 text-white">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
