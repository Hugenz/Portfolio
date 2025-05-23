export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <p>
            <a href="/about" className="text-gray-400 hover:text-white">About</a> |{" "}
            <a href="/contact" className="text-gray-400 hover:text-white">Contact</a> |{" "}
            <a href="/projects" className="text-gray-400 hover:text-white">Projects</a>
            </p>
        </div>
        </footer>
    );
}