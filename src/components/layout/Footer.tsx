import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="font-clash px-10 pb-10">
            <div
                className="flex flex-col items-center justify-center gap-4 pt-6 md:pt-0
                     md:flex-row sm:justify-between text-lg font-medium"
            >
                {[
                    {
                        href: "https://www.instagram.com/enzobeystudio/",
                        label: "INSTAGRAM",
                    },
                    {
                        href: "https://www.linkedin.com/in/enzo-bey-0b74bb2b6/",
                        label: "LINKEDIN",
                    },
                    {
                        href: "https://www.behance.net/enzo_bey",
                        label: "BEHANCE",
                    },
                    { href: "/", label: "UNSPLASH" },
                ].map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex justify-between w-full md:flex md:justify-center md:items-center md:w-auto group text-black-400 transition-colors hover:scale-105 hover:text-black-200"
                    >
                        <span className="flex items-center gap-1">{label}</span>
                        <ArrowUpRight className="inline-block group-hover:animate-bounce" />
                    </Link>
                ))}
            </div>
        </footer>
    );
}
