import Link from "next/link";

export default function Header() {
    return (
        <header className="text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}