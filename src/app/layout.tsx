import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-roboto",
    subsets: ["latin"],
    display: "swap",
});

const clashDisplay = localFont({
    src: [
        {
            path: "../../public/fonts/ClashDisplay/ClashDisplay-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-clash",
});

export const metadata: Metadata = {
    title: "Enzo Bey | Portfolio | photographer & Designer",
    description:
        "Portfolio of Enzo Bey, a photographer and designer based in France.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${roboto.variable} ${clashDisplay.variable}`}
        >
            <body className="font-sans antialiased min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col justify-center items-center px-10 md:px-32">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
