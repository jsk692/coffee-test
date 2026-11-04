import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const serif = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Noto_Sans_TC({
  variable: "--font-sans-tc",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "山嵐 Lanshan Roasters｜台灣在地精品烘豆",
  description:
    "山嵐 Lanshan Roasters 嚴選阿里山、南投、屏東等台灣產區咖啡豆，小批次烘焙，把山間的霧氣與晨光烘進每一杯咖啡。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${serif.variable} ${sans.variable} antialiased`}
    >
      <body className="min-h-full font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
