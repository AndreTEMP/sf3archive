import "~/styles/globals.css";
import Link from "next/link";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex w-full items-center justify-around border-b p-4 text-xl font-semibold">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/players">Players</Link>
      </div>
      <div>
        <Link href="/characters">Characters</Link>
      </div>
      <div>
        <Link href="/venues">Venues</Link>
      </div>
      <div>
        <Link href="/events">Events</Link>
      </div>
      <div>
        <Link href="/miscellaneous">Miscellaneous</Link>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={"flex flex-col gap-4"}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
