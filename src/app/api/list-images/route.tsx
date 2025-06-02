// src/app/api/list-images/route.js
type ImageKitFile = {
    folder?: string;
    // add other properties if needed
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "/portfolio";
    const btoa = (str: string) => Buffer.from(str).toString("base64");
    const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

    const response = await fetch("https://api.imagekit.io/v1/files", {
        headers: {
            Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`,
        },
    });
    const files: ImageKitFile[] = await response.json();

    // Filtrage possible ici selon le dossier
    const filtered = files.filter(
        (file: ImageKitFile) => file.folder && file.folder.startsWith(folder)
    );
    return Response.json(filtered);
}
