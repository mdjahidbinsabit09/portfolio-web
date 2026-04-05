import { GoogleTagManager } from "@next/third-parties/google";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./components/helper/theme-provider";
import PublicSiteWrapper from "./components/helper/public-site-wrapper";
import "./css/card.scss";
import "./css/globals.scss";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "MD Jahid Bin Sabit - WordPress & Full Stack Developer",
  description:
    "Professional portfolio of MD Jahid Bin Sabit. WordPress & Full Stack Developer specializing in high-performance websites, custom plugins, and scalable web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <ThemeProvider>
          <ToastContainer position="bottom-right" />
          <PublicSiteWrapper>
            {children}
          </PublicSiteWrapper>
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
