import { useRouteError, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
      <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">System Interrupted</h1>
      <p className="text-zinc-400 mb-6 font-mono text-xs italic">
        {error.statusText || error.message}
      </p>
      <Link to="/" className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all text-sm font-bold">
        <Home className="w-4 h-4" /> Return to Safety
      </Link>
    </div>
  );
}