export default function ErrorComponent({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 mb-4">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
