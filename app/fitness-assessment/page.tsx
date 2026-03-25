export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-semibold mb-4">
        30-Min Fitness Assessment
      </h1>

      <p className="mb-6 text-sm text-black/70">
        A focused 1-1 session to assess your current level, movement patterns and training direction.
      </p>

      <iframe
        src="https://cal.com/human-pea-28vrwm/fitness-assessment?embed=true"
        width="100%"
        height="600"
        frameBorder="0"
      />
    </main>
  );
}
