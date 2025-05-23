import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="font-clash">
            <span className="flex justify-center text-center text-[12vw] font-bold text-black-400 px-10">
                enzobeystudio*
            </span>

            <div
                className="flex flex-col items-center justify-center gap-4
                      px-10 sm:flex-row sm:justify-between text-lg font-medium"
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
                        className="group text-black-400 transition-colors hover:scale-105 hover:text-black-200"
                    >
                        <span className="flex items-center gap-1">
                            {label}
                            <ArrowUpRight className="inline-block group-hover:animate-bounce" />
                        </span>
                    </Link>
                ))}
            </div>
        </footer>
    );
}
