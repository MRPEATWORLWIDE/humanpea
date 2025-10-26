export default function FormPage() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <iframe
        src="https://form.jotform.com/252973068946371"
        title="HumanPea Form"
        className="w-full"
        height={1400}
        style={{
          border: "1px solid #00000015",
          borderRadius: "12px",
          maxWidth: "720px",
          backgroundColor: "#f9f9f9"
        }}
        allow="payment *; geolocation *; microphone *; camera *; autoplay *"
      />
    </main>
  );
}
