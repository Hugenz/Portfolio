import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

        if (!IMAGEKIT_PRIVATE_KEY) {
            return Response.json(
                {
                    error: "Configuration manquante",
                    debug: "IMAGEKIT_PRIVATE_KEY manquante dans les variables d'environnement",
                },
                { status: 500 }
            );
        }

        // Encodage correct pour l'authentification ImageKit
        const authToken = Buffer.from(IMAGEKIT_PRIVATE_KEY + ":").toString(
            "base64"
        );

        // Récupérer TOUS les fichiers sans restriction de path
        const response = await fetch(
            "https://api.imagekit.io/v1/files?limit=1000&sort=ASC_CREATED",
            {
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return Response.json(
                {
                    error: "Failed to fetch from ImageKit",
                    status: response.status,
                    details: errorText,
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // ImageKit retourne parfois les fichiers dans une propriété 'files' ou directement
        let files = [];
        if (Array.isArray(data)) {
            files = data;
        } else if (data && Array.isArray(data.files)) {
            files = data.files;
        } else {
            return Response.json({
                error: "Structure de réponse inattendue",
                receivedData: data,
                files: [],
            });
        }

        // Filtrer les fichiers qui sont dans le dossier portfolio
        const portfolioFiles = files.filter((file: any) => {
            return (
                file.filePath &&
                file.filePath.toLowerCase().includes("portfolio")
            );
        });

        // Filtrer uniquement les images
        const imageFiles = portfolioFiles.filter((file: any) => {
            return (
                file.fileType === "image" ||
                /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
            );
        });

        // Grouper par dossier pour debug
        const folderGroups = imageFiles.reduce((acc: any, file: any) => {
            const folder = file.filePath.split("/").slice(0, -1).join("/");
            if (!acc[folder]) acc[folder] = [];
            acc[folder].push(file.name);
            return acc;
        }, {});

        // Retourner les données avec debug info étendu
        return Response.json({
            files: imageFiles,
            debug: {
                totalFilesFromAPI: files.length,
                portfolioFilesFound: portfolioFiles.length,
                imageFilesFiltered: imageFiles.length,
                folderStructure: folderGroups,
                allPortfolioFiles: portfolioFiles.map((f: any) => ({
                    name: f.name,
                    path: f.filePath,
                    type: f.fileType,
                })),
                sampleNonPortfolioFiles: files
                    .filter(
                        (f: any) =>
                            !f.filePath.toLowerCase().includes("portfolio")
                    )
                    .slice(0, 5)
                    .map((f: any) => f.filePath),
            },
        });
    } catch (error) {
        return Response.json(
            {
                error: "Erreur serveur",
                details:
                    error instanceof Error ? error.message : "Erreur inconnue",
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
