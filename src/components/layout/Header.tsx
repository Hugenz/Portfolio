import Link from "next/link";

export default function Header() {
    return (
        <header className="text-black px-10 pt-10">
            <div className="grid grid-cols-3 grid-rows-2 gap-0">
                <div className="col-start-1 col-end-2 row-start-1 row-end-2">
                    <div className="flex flex-col text-[9px]">
                        <Link href="/">
                            <span className="uppercase font-bold">
                                bey enzo
                            </span>
                        </Link>
                        <span className="uppercase">graphic design</span>
                        <span className="uppercase">& photographie</span>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-1 row-end-2"></div>
                <div className="col-start-3 col-end-4 row-start-1 row-end-2">
                    <div className="flex gap-4 text-[9px] uppercase font-medium">
                        <Link href="/about">
                            <span>about</span>
                        </Link>
                        <Link href="/contact">
                            <span>contact</span>
                        </Link>
                    </div>
                </div>
                <div className="col-start-1 col-end-4 row-start-2 row-end-3"></div>
            </div>
        </header>
    );
}
