import SearchExperience from "@/components/SearchExperience";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-5 sm:px-10 py-4 border-b border-rule/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center">
            <span className="font-display text-[13px] text-amber font-semibold">G</span>
          </div>
          <span className="font-display text-[15px] text-heading tracking-tight">
            GL-BAJAJ
          </span>
        </div>
        <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-muted border border-rule rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber glow-dot animate-glowPulse" />
          AI Search &middot; Live
        </span>
      </header>

      <SearchExperience />
    </main>
  );
}
