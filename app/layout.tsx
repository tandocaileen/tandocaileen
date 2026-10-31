import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--f-inter" });
const serif = Fraunces({ subsets: ["latin"], variable: "--f-serif" });
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-pixel",
});

export const metadata: Metadata = {
  title: "Aileen Tandoc — Software Engineer",
  description:
    "Software Engineer in Cebu, Philippines. Flutter, .NET/C#, Python, and cloud. Experience, projects, and skills.",
  openGraph: {
    title: "Aileen Tandoc — Software Engineer",
    description:
      "Naturally curious problem solver. I like non-repetitive work, a good challenge, and figuring out how everything fits together.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#080b16" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pixel.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("theme")==="sunset")document.documentElement.dataset.theme="sunset"}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
