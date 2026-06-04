import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habi - Te acompañamos en cada paso",
  description:
    "Recibe una oferta directa por tu inmueble. Sin publicar, sin visitas de desconocidos, sin complicaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
