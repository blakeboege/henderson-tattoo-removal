import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingProvider from "@/components/BookingProvider";

export const metadata: Metadata = {
  title: "Henderson Tattoo Removal — Safe, evidence-based laser tattoo removal in Henderson, NV",
  description:
    "Evidence-based laser tattoo removal with PicoWay technology. Transparent pricing. Realistic timelines. No package upsells. Serving Henderson, Las Vegas, and Summerlin.",
  icons: {
    icon: "/assets/logomark.svg",
  },
  openGraph: {
    title: "Henderson Tattoo Removal",
    description:
      "Safe, evidence-based laser tattoo removal in Henderson, NV. Transparent pricing. Realistic timelines.",
    type: "website",
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
