import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PapStack Magazine",
  description: "Rollende Unterforderung · Mobilität für alle: Volkswagen gibt mit ID. · die Legende kehrt zurück in Form des allerersten elektrischen „Mini-Supersportwagens“.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
