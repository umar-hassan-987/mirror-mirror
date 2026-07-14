import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

// Dynamic import Chatbot — not needed on initial render, code-splits from main bundle
const Chatbot = dynamic(() => import("@/components/Chatbot/Chatbot"));

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
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load fonts with display=swap to prevent FOIT (Flash of Invisible Text) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="bg-background text-on-background min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow flex flex-col">{children}</div>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
