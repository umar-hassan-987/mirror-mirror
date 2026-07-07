import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const metadata = {
  title: "Mirror Mirror | Premium Event Activations Qatar",
  description: "Explore our gallery of high-end activations, weddings, and corporate events. Where luxury meets interactive technology in Qatar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-on-background min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
