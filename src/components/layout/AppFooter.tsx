import { Heart } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} CP-Pharma. Curated with love for an unforgettable Valentine's Day.
        </p>
      </div>
    </footer>
  );
}
