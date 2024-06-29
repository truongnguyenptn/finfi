import Head from "next/head";
import { Archivo } from "next/font/google";
import Providers from "../providers";

import "../globals.css";
import "./dashboard.css";
import { Metadata } from "next";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s :: Finfi",
        default: "Finfi",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link rel="icon" href="/favicon.ico" />

                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <body className={archivo.className + " h-full"}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
