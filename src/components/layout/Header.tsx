"use client";

import Link from "next/link";
import { useFilterStore } from "@/store/filterStore";

const categories = [
    { label: "all", value: "" },
    { label: "photos", value: "photos" },
    { label: "3d", value: "3d" },
    { label: "motion design", value: "motiondesign" },
    { label: "graphisme", value: "graphisme" },
];

export default function Header() {
    const { filter, setFilter } = useFilterStore();

    return (
        <header className="text-black px-10 pt-10">
            <div className="grid grid-cols-3 grid-rows-2 gap-0">
                <div className="col-start-1 col-end-2 row-start-1 row-end-2">
                    <div className="flex flex-col text-[9px] md:text-[17px]">
                        <Link href="/">
                            <span className="uppercase font-bold">
                                bey enzo
                            </span>
                        </Link>
                        <span className="uppercase">graphic design</span>
                        <span className="uppercase">& photographie</span>
                    </div>
                </div>
                <div className="col-start-3 col-end-4 row-start-1 row-end-2">
                    <div className="flex justify-end gap-4 text-[9px] md:text-[17px] uppercase font-medium">
                        <Link href="/about">
                            <span>about</span>
                        </Link>
                        <Link href="/contact">
                            <span>contact</span>
                        </Link>
                    </div>
                </div>
                <div className="col-start-1 col-end-4 row-start-2 row-end-3 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2text-black/40">
                    <div className="flex font-medium text-[13px] uppercase gap-3 pt-10 pb-6 md:pt-0 md:pb-0 md:flex-row md:gap-6 md:justify-center md:items-start">
                        <div className="hidden md:flex flex-col items-end flex-shrink-0">
                            <span className="text-black uppercase">
                                projects
                            </span>
                        </div>
                        <div className="flex flex-row md:flex-col gap-3 md:gap-0">
                            {categories.map((cat) => (
                                <span
                                    key={cat.value}
                                    className={`
                                        cursor-pointer transition
                                        ${
                                            filter === cat.value
                                                ? "text-black font-bold"
                                                : "text-black/40 font-normal hover:text-black"
                                        }
                                    `}
                                    onClick={() => setFilter(cat.value)}
                                >
                                    {cat.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
