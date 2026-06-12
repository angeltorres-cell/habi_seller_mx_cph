import type { Metadata } from "next";
import "./globals.css";
import SegmentScript from "@/components/SegmentScript";

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
      <body>
        <SegmentScript />
        {children}
      </body>
    </html>
  );
}
