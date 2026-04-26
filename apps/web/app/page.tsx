export default function Home() {
  return (
    <section className="space-y-6 pb-10">
      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Use command search or the header actions to jump between features.
        </p>
      </div>
    </section>
  );
}
