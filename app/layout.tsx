import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingProvider from "@/components/BookingProvider";

const GA_MEASUREMENT_ID = "G-ZV3FCQ724R";

export const metadata: Metadata = {
  metadataBase: new URL("https://hendersontattooremoval.com"),
  title:
    "Laser Tattoo Removal in Henderson, NV | Henderson Tattoo Removal",
  description:
    "Safe laser tattoo removal in Henderson, NV with transparent pricing, realistic timelines, and free consultations. Serving Henderson, Green Valley, Anthem, Seven Hills, and Las Vegas.",
  openGraph: {
    title: "Laser Tattoo Removal in Henderson, NV",
    description:
      "Safe laser tattoo removal in Henderson, NV with transparent pricing, realistic timelines, and free consultations.",
    url: "https://hendersontattooremoval.com",
    siteName: "Henderson Tattoo Removal",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laser Tattoo Removal in Henderson, NV",
    description:
      "Safe laser tattoo removal in Henderson, NV with transparent pricing, realistic timelines, and free consultations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    // Favicon is auto-handled by Next.js from app/icon.svg.
    // Apple touch icon is served from /public as a static SVG.
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root" style={{ overflowX: "hidden", background: "#f5f5f7" }}>
          <BookingProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </BookingProvider>
        </div>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
