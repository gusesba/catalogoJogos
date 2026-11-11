import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";

export const metadata: Metadata = {
  title: "Nexo — Pequenos jogos, muitos mundos",
  description:
    "Descubra jogos, conquiste novos mundos e conecte sua jornada. Proposta interativa de catálogo de estúdio independente.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <a className="skip-link" href="#catalogo">
          Pular para o catálogo
        </a>
        {children}
      </body>
    </html>
  );
}
