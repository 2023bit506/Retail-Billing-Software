import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <SearchX className="h-24 w-24 text-primary relative" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-foreground">404</h1>
              <p className="text-xl font-semibold text-foreground">Page Not Found</p>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </div>

            <div className="pt-4 text-xs text-muted-foreground">
              Attempted path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
