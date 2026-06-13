import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Jeremy Dowdy | Full-Stack Software Engineer & Database Architect",
  description: "Personal portfolio of Jeremy Dowdy. Highlighting full-stack web applications, isolated PostgreSQL database schemas, and custom API integrations.",
  keywords: ["Jeremy Dowdy", "Software Engineer", "Full Stack Developer", "Next.js", "PostgreSQL", "Supabase", "Django", "Austin"],
  authors: [{ name: "Jeremy Dowdy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Ambient background mesh gradient */}
        <div className="mesh-gradient-bg" />
        
        {/* Floating Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
        
        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--surface-border)', background: 'var(--surface-bg)', paddingBlock: 'var(--space-md)', textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div className="container">
            <p>© {new Date().getFullYear()} Jeremy Dowdy. All rights reserved.</p>
            <p style={{ marginTop: '4px', fontSize: '0.75rem' }}>Built using Next.js, Postgres.js, and Supabase Pro.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
