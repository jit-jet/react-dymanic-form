import { Loader2 } from "lucide-react";

export default function LoadingComponent() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-300">Loading form configuration...</p>
      </div>
    </div>
  );
}
