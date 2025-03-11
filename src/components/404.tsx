import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or never existed.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link to="/vishal/Luke">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </Link>
            </Button>
            <Button asChild>
              <Link to="/vishal/Luke">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
