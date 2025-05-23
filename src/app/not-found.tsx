import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
